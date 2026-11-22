import {
  getLastEmailDate,
  GetLastEmailDateOutput,
} from "@/services/server/upstash";

export default async function UpstashDateInfo() {
  const data = (await getLastEmailDate()) as GetLastEmailDateOutput;

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  }).format(new Date(data.last_email_date));

  return (
    <div className="flex flex-col gap-2">
      <p className="text-secondary-text">
        Último email enviado:{" "}
        <span className="font-bold text-primary-text">{formatted}</span>
      </p>

      <p>
        <span className="text-secondary-text">
          Dias restantes:{" "}
          {data.days_remaining <= 0 ? (
            <span className="text-primary-text">
              Prazo de 14 dias esgotado. Crie novos bancos de dados para staging
              e production na Upstash e atualize as variáveis REDIS_HOST,
              REDIS_PASSWORD e REDIS_PORT da app backend na Render.
            </span>
          ) : (
            <span className="font-bold text-primary-text">
              {data.days_remaining}
            </span>
          )}
        </span>
      </p>
    </div>
  );
}
