console.log("Hello TensorFlow");
/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */
async function getData() {
  const carsDataResponse = await fetch("https://storage.googleapis.com/tfjs-tutorials/carsData.json");
  const carsData = await carsDataResponse.json(); // 1차원 객체 배열 반환
  // console.log(carsData[0])
  // 필요 데이터만 추출
  const cleaned = carsData
    .map((car) => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter((car) => car.mpg != null && car.horsepower != null); // 결측치 제거

  return cleaned;
}

// df = getData();
// console.log(df)

// 산점도 표시
async function run() {
    // Load and plot the original input data that we are going to train on.
    const data = await getData();
    // 데이터 옮겨담기
    const values = data.map(d => ({ 
      x: d.horsepower,
      y: d.mpg,
    }));
    // 플롯팅
    tfvis.render.scatterplot(
      {name: 'Horsepower v MPG'},
      {values},
      {
        xLabel: 'Horsepower',
        yLabel: 'MPG',
        height: 300
      }
    );
  
    // More code will be added below
  }
  
  document.addEventListener('DOMContentLoaded', run);