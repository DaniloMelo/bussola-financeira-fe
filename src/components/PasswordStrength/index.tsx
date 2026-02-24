type PasswordStrengthProps = {
  password: string;
};

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  if (password.length < 6) return;

  const weekPasswordRegex = /^(?:[a-z]{6,}|[A-Z]{6,}|\d{6,}|[^a-zA-Z\d]{6,})$/;

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/;

  if (weekPasswordRegex.test(password)) {
    return (
      <p>
        Força da senha:{" "}
        <span className="font-semibold text-red-600">Fraca</span>
      </p>
    );
  }

  if (strongPasswordRegex.test(password)) {
    return (
      <p>
        Força da senha:{" "}
        <span className="font-semibold text-green-700">Forte</span>
      </p>
    );
  }

  return (
    <p>
      Força da senha:{" "}
      <span className="font-semibold text-yellow-600">Média</span>
    </p>
  );
}
