export const candleStickData = (data, endMonth) => {
  const cData = [];

  for (let i = 11; i >= 0; i--) {
    const element = {
      x: new Date(endMonth.getFullYear(), endMonth.getMonth() - i, 1),
      y: 0,
      y0: 0,
      dir: 1,
    };
    cData.push(element);
  }

  let yStart = 0;
  cData.forEach((element) => {
    let sum = 0;
    let budget = 0;
    let month = new Date(element.x.getFullYear(), element.x.getMonth(), 1);
    data.forEach((value) => {
      let dataMonth = new Date(
        value.date.getFullYear(),
        value.date.getMonth(),
        1
      );
      if (month.getTime() === dataMonth.getTime()) {
        sum += value.amount;
        budget = value.budget;
        if (dataMonth.getTime() === new Date(2021, 8, 1).getTime()) {
        }
      }
    });
    element.y0 = yStart;
    element.y = yStart + (budget - sum);
    if (element.y < element.y0) {
      element.dir = -1;
    }
    yStart = element.y;
  });

  return cData;
};
