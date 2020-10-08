/*The Leitner system is a widely used method of 
efficiently using flashcards that was proposed 
by the German science journalist Sebastian Leitner 
in the 1970s. It is a simple implementation of the 
principle of spaced repetition, where cards are reviewed 
at increasing intervals.

In this method flashcards are sorted into groups according 
to how well the learner knows each one in the Leitner's 
learning box. The learners try to recall the solution 
written on a flashcard. If they succeed, they send the card
 to the next group. If they fail, they send it back to the 
 first group. Each succeeding group has a longer period of 
 time before the learner is required to revisit the cards. 
 In Leitner's original method, published in his book So 
 lernt man Lernen (How to learn to learn), the schedule of 
 repetition was governed by the size of the partitions in 
 the learning box. These were 1, 2, 5, 8 and 14 cm. Only 
 when a partition became full, was the learner to review 
 some of the cards it contained, moving them forward or 
 back, depending on whether they remembered them.
*/

/*public static T Random<T>(this IEnumerable<T> enumerable, Func<T, int> weightFunc)
{
    int totalWeight = 0; // this stores sum of weights of all elements before current
    T selected = default(T); // currently selected element
    foreach (var data in enumerable)
    {
        int weight = weightFunc(data); // weight of current element
        int r = Random.Next(totalWeight + weight); // random value
        if (r >= totalWeight) // probability of this is weight/(totalWeight+weight)
            selected = data; // it is the probability of discarding last selected element and selecting current one instead
        totalWeight += weight; // increase weight sum
    }

    return selected; // when iterations end, selected is some element of sequence. 
}*/

const TAO = 1000.0 * 60 * 60 * 24;

export const score = (responses) => {
  if (responses.length === 0) {
    return -1;
  }
  const now = Date.now();
  const weightedSum = responses
    .map(
      (response) => response.correctness * Math.exp((response.t - now) / TAO)
    )
    .reduce((sum, x) => sum + x);
  return weightedSum / responses.length;
};

const sort = () => {
  cards.sort((a, b) => score(a.responses) - score(b.responses));
};