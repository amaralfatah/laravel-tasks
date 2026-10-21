<?php

use App\Models\User;
use App\Models\WorkspaceMember;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page->component('auth/register'));
});

test('the login screen offers registration', function () {
    $this->get(route('login'))
        ->assertInertia(fn (Assert $page) => $page->where('canRegister', true));
});

test('new users can register', function () {
    Notification::fake();

    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::where('email', 'test@example.com')->firstOrFail();

    expect($user->hasVerifiedEmail())->toBeFalse()
        ->and($user->is_super_admin)->toBeFalse()
        ->and(WorkspaceMember::withoutGlobalScopes()->where('user_id', $user->id)->exists())->toBeFalse();

    Notification::assertSentTo($user, VerifyEmail::class);
});

test('registration refuses an address that already has an account', function () {
    User::factory()->create(['email' => 'taken@example.com']);

    $this->post(route('register.store'), [
        'name' => 'Someone Else',
        'email' => 'taken@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('registration cannot make a super admin', function () {
    $this->post(route('register.store'), [
        'name' => 'Sneaky',
        'email' => 'sneaky@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'is_super_admin' => true,
    ]);

    expect(User::where('email', 'sneaky@example.com')->value('is_super_admin'))->toBeFalsy();
});

test('an unverified account is held at the verification notice', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)->get(route('workspace.none'))
        ->assertRedirect(route('verification.notice'));

    $this->actingAs($user)->post(route('workspace.start'), ['name' => 'Studio'])
        ->assertRedirect(route('verification.notice'));

    expect(WorkspaceMember::withoutGlobalScopes()->where('user_id', $user->id)->exists())->toBeFalse();
});

test('a verified new account may start its own workspace', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get(route('workspace.none'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->where('canStart', true));

    $this->actingAs($user)->post(route('workspace.start'), ['name' => 'Studio Rekayasa'])
        ->assertRedirect(route('projects.index'));

    expect(WorkspaceMember::withoutGlobalScopes()->where('user_id', $user->id)->exists())->toBeTrue();
});
