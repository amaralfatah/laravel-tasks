// Components
import { Form, Head, usePage } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    const email = usePage().props.auth.user?.email;

    return (
        <>
            <Head title="Verifikasi email" />

            <div className="grid gap-6">
                <div className="grid gap-2 text-center text-sm text-muted-foreground">
                    {email && (
                        <p>
                            Dikirim ke{' '}
                            <span className="font-medium break-all text-foreground">
                                {email}
                            </span>
                            .
                        </p>
                    )}
                    <p>
                        Tidak menemukannya? Periksa folder spam, atau kirim
                        ulang.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <p
                        role="status"
                        className="text-center text-sm font-medium text-success"
                    >
                        Tautan verifikasi baru sudah dikirim.
                    </p>
                )}

                <Form {...send.form()} className="grid gap-4 text-center">
                    {({ processing }) => (
                        <>
                            <Button
                                disabled={processing}
                                variant="secondary"
                                className="w-full"
                            >
                                {processing && <Spinner />}
                                Kirim ulang email verifikasi
                            </Button>

                            <TextLink
                                href={logout()}
                                className="mx-auto text-sm"
                            >
                                Keluar
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Periksa email Anda',
    description:
        'Buka tautan verifikasi yang kami kirim untuk mengaktifkan akun, lalu buat workspace Anda.',
};
