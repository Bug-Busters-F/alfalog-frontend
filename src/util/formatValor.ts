export function formatarValor(valor: number): string {
  if (valor >= 1_000_000) {
    const milhoes = valor / 1_000_000;
    return `R$ ${milhoes.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} mi`;
  } else if (valor >= 1_000) {
    const milhares = valor / 1_000;
    return `R$ ${milhares.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} mil`;
  } else {
    return `R$ ${valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
