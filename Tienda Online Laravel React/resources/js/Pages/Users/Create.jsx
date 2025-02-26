import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

export default function CreateUser() {
    // Manejo de los estados del formulario
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // Para manejar los errores de validación
    const { errors } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar el formulario a la ruta 'users.store' con Inertia.js
        Inertia.post("/users", {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
    };

    return (
        <div>
            <h1>Crear Usuario</h1>

            {/* Mostrar errores de validación */}
            {errors && (
                <div>
                    <ul>
                        {Object.keys(errors).map((key) => (
                            <li key={key}>{errors[key]}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Formulario de creación de usuario */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}
