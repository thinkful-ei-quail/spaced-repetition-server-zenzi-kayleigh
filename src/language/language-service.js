const LinkedList = require("../linkedList/LinkedList");


const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from("language")
      .select(
        "language.id",
        "language.name",
        "language.user_id",
        "language.head",
        "language.total_score"
      )
      .where("language.user_id", user_id)
      .first();
  },
  serialize(db, list) {
    return db.transaction((trx) => {
      let words = list.toArray();
      const queries = [];
      words.forEach((word) => {
        const query = db("word")
          .where("id", word.id)
          .update(word)
          .transacting(trx);
        queries.push(query);
      });
      Promise.all(queries).then(trx.commit).catch(trx.rollback);
    });
  },
  getLanguageWords(db, language_id) {
    return db
      .from("word")
      .select(
        "id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count"
      )
      .where({ language_id });
  },
  getHeadWord(db, language_id) {
    return db
      .from("language")
      .select("head")
      .where({ id: language_id })
      .first();
  },
  getWord(db, headId) {
    return db.from("word").select("*").where({ id: headId }).first();
  },
  async getLinkedList(db, language) {
    const linkedList = new LinkedList();
    const words = await LanguageService.getLanguageWords(db, language.id);
    let node = words.find((word) => word.id === language.head);

    while (node) {
      linkedList.insertLast(node);
      node = words.find((word) => word.id === node.next);
    }
    return linkedList;
  },
  updateLanguage(db, language) {
    let id = language.id;
    delete language.id;
    return db("language").update(language).where({ id });
  },
};
// createNewOrder (db, user_id) {
//   return db
//     .from('language')
//     if (newGuess == "original")
//     export const score = (responses) => {
// if (responses.length === 0) {
//   return -1;
// }
//take past responses from last round to decide current order
//add total score to my table?
//should the comparison occur in the response? If guess response === original
//increment by 1?
//should a memory value also be in my table?
//use insertbefore and insert after to sort lists?
//SELECT

//  node sortedMerge(node a, node b)
//     {
//         node result = null;
//         /* Base cases */
//         if (a == null)
//             return b;
//         if (b == null)
//             return a;

//         /* Pick either a or b, and recur */
//         if (a.val <= b.val) {
//             result = a;
//             result.next = sortedMerge(a.next, b);
//         }
//         else {
//             result = b;
//             result.next = sortedMerge(a, b.next);
//         }
//         return result;
//     }

//     node mergeSort(node h)
//     {
//         // Base case : if head is null
//         if (h == null || h.next == null) {
//             return h;
//         }

//         // get the middle of the list
//         node middle = getMiddle(h);
//         node nextofmiddle = middle.next;

//         // set the next of middle node to null
//         middle.next = null;

//         // Apply mergeSort on left list
//         node left = mergeSort(h);

//         // Apply mergeSort on right list
//         node right = mergeSort(nextofmiddle);

//         // Merge the left and right lists
//         node sortedlist = sortedMerge(left, right);
//         return sortedlist;
//     }

//     // Utility function to get the middle of the linked list
//     public static node getMiddle(node head)
//     {
//         if (head == null)
//             return head;

//         node slow = head, fast = head;

//         while (fast.next != null && fast.next.next != null) {
//             slow = slow.next;
//             fast = fast.next.next;
//         }
//         return slow;
//     }

//     void push(int new_data)
//     {
//         /* allocate node */
//         node new_node = new node(new_data);

//         /* link the old list off the new node */
//         new_node.next = head;

//         /* move the head to point to the new node */
//         head = new_node;
//     }

// const sort = () => {
//   guess.sort((a, b) => score(a.responses) - score(b.responses));
// };
// }
// }

module.exports = LanguageService;
