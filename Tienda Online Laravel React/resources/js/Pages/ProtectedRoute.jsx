import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

export default function ProtectedRoute({ roles, children }) {
    const { auth } = usePage().props;

    const hasAccess = roles.some((role) => auth.user.roles.includes(role));

    if (!hasAccess) {
        Inertia.visit("/unauthorized");
        return null;
    }

    return <>{children}</>;
}
