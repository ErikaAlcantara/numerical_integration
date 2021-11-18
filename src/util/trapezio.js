import { evaluate } from "mathjs";

function f(funcao, x) {
  const valor = funcao.replaceAll("x", x);
  return evaluate(valor);
}

export function useTrapezio({ a, b, n, funcao }) {
  let resultados = [];

  let h = (b - a) / n;

  let soma = f(funcao, a) + f(funcao, b);

  resultados.push({ i: 0, xi: a, fxi: f(funcao, a) });

  for (let i = 1; i < n; i++) {
    soma += 2 * f(funcao, a + i * h);

    resultados.push({ i, xi: a + i * h, fxi: f(funcao, a + i * h) });
  }

  const resultado = (h / 2) * soma;

  return { resultado, resultados };
}

// let a = 3;
// let b = 3.6;
// let n = 6;

// console.log(trapezio(a, b, n));
