import { UpstashCounterButton } from "@/components/admin/UpstashCounterButton";
import UpstashDateInfo from "@/components/admin/UpstashDateInfo";

export default function UpstashUpdatePage() {
  return (
    <section>
      <div className="text-sm mb-10 text-primary-text">
        <p className="mb-2">
          Após <span className="font-bold">14 dias de inatividade</span>, o
          banco de dados Redis na upstash é desativado.
        </p>

        <p>Lembre-se enviar o email no ambiente de staging também</p>
      </div>

      <UpstashDateInfo />

      <UpstashCounterButton />
    </section>
  );
}

// <p>14 dias upstash</p>
// <p>lembre-se de enviar o email também no ambiente de staging</p>
