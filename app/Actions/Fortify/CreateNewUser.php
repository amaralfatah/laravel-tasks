<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

/**
 * Self-serve signup, the Trello/Jira way: anyone opens an account with an
 * email address, confirms it, and then starts a workspace of their own on
 * `workspace/none` — or accepts an invitation into someone else's.
 *
 * The account belongs to no workspace yet and is never a super admin; that
 * stays with `tasks:super-admin`. Verification is left to the emailed link,
 * unlike the invitation path, where the link itself proves the address.
 */
class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ], attributes: [
            'name' => 'nama',
            'password' => 'kata sandi',
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);
    }
}
