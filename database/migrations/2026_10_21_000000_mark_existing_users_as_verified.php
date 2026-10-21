<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Marks every account that predates self-serve signup as verified.
 *
 * `User` now implements `MustVerifyEmail`, so an account with no
 * `email_verified_at` is held at the verification notice. Until now every
 * account came from an operator, an invitation or a seeder — paths that vouch
 * for the address themselves — and the few rows without a stamp (an email
 * changed in profile settings) would otherwise be locked out on their next
 * request by a check that did not exist when they were created.
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::table('users')
            ->whereNull('email_verified_at')
            ->update(['email_verified_at' => DB::raw('created_at')]);

        DB::table('users')
            ->whereNull('email_verified_at')
            ->update(['email_verified_at' => now()]);
    }

    /**
     * Irreversible: these stamps are indistinguishable from verifications made
     * through the emailed link.
     */
    public function down(): void
    {
        //
    }
};
