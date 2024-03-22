type Diet = {
  id: string;
  name: string;
  description: string;
  isOnTheDiet: boolean;
  created_at: string;
  session_id?: string | undefined;
}[]

export function calcularMelhorSequenciaDeRefeicoes(diet: Diet) {
  const sizeDiet = diet.length;
  const maxMeals = Array(sizeDiet).fill(0);

  for (let i = 0; i < sizeDiet; i++) {
    if (Number(diet[i].isOnTheDiet) === 1) {
      maxMeals[i] = 1;
      for (let j = 0; j < i; j++) {
        if (new Date(diet[i].created_at) > new Date(diet[j].created_at)) {
          maxMeals[i] = Math.max(maxMeals[i], maxMeals[j] + 1);
        }
      }
    }
  }

  return Math.max(...maxMeals);
}