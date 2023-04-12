export const sumData = (data, type) => {
  let sum = 0;
  data.forEach((element) => {
    if (element.type === type) {
      sum += +element.amount;
    }

    if (type === "expenses") {
      if (element.type === "exp-fixed" || element.type === "exp-variable") {
        sum += +element.amount;
      }
    }
  });
  return sum;
};

export const objectItemSum = (data) => {
  let summedItems = [];
  let i = 0;

  data.map((item) => {
    let exist = summedItems.findIndex((indexData) => {
      const d = new Date(item.date);
      return (
        new Date(
          indexData.date.getFullYear(),
          indexData.date.getMonth(),
          1
        ).getTime() === new Date(d.getFullYear(), d.getMonth(), 1).getTime()
      );
    });

    if (exist !== -1) {
      summedItems[exist].id = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
      summedItems[exist].amount += +item.amount;
    } else {
      const d = new Date(item.date);
      let expObj = {
        id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        item: item.item,
        amount: +item.amount,
        budget: +item.budget,
        type: item.type,
        date: new Date(d.getFullYear(), d.getMonth(), 1),
      };

      summedItems.push(expObj);
      i++;
    }
  });

  summedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
  return summedItems;
};
