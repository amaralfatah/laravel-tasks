import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { logout } from '@/routes';
import { start } from '@/routes/workspace';
import { index as workspacesIndex } from '@/routes/workspaces';

/**
 * Where someone lands with no workspace to work in.
 *
 * Three different situations end up here, so the page says which one it is:
 * a brand new account (start one), an account whose workspace was switched off
 * (nothing to do but ask an admin), and the platform operator (who never works
 * inside a workspace and manages them from the roster instead).
 *
 * For a new account this is the last step of signup, so it wears the same
 * frame as the register and verify-email pages.
 */
export default function WorkspaceNone({
    isSuperAdmin,
    canStart,
}: {
    isSuperAdmin: boolean;
    canStart: boolean;
}) {
    const title = canStart
        ? 'Mulai workspace Anda'
        : 'Belum ada workspace aktif';

    const description = isSuperAdmin
        ? 'Akun ini adalah super admin. Buat workspace pertama dari halaman kelola workspace.'
        : canStart
          ? 'Workspace adalah tempat project dan task Anda. Anggota dan struktur bisa ditambahkan kapan saja.'
          : 'Akun Anda belum tergabung di workspace mana pun, atau workspace Anda sedang dinonaktifkan. Hubungi admin workspace Anda, atau buka tautan undangan bila sudah menerimanya.';

    return (
        <AuthLayoutTemplate title={title} description={description}>
            <Head title={title} />

            {canStart && (
                <Form
                    {...start.form()}
                    disableWhileProcessing
                    className="grid gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama workspace</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    autoFocus
                                    maxLength={255}
                                    placeholder="Nama Anda, tim, atau perusahaan"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <Button type="submit" className="w-full">
                                {processing && <Spinner />}
                                Mulai bekerja
                            </Button>
                        </>
                    )}
                </Form>
            )}

            <div className="grid gap-4 text-center">
                {isSuperAdmin && (
                    <Button asChild className="w-full">
                        <Link href={workspacesIndex()}>Kelola workspace</Link>
                    </Button>
                )}

                <TextLink href={logout()} className="mx-auto text-sm">
                    Keluar
                </TextLink>
            </div>
        </AuthLayoutTemplate>
    );
}
