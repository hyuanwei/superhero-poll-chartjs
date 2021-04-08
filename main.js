const pollData = [
  {
    option: "Spider-Man",
    votes: 11,
    color: "rgb(255, 99, 132)"
  },
  {
    option: "Falcon",
    votes: 8,
    color: "rgb(54, 162, 235)"
  },
  {
    option: "Winter Soldier",
    votes: 11,
    color: "rgb(36, 36, 36)"
  },
  {
    option: "Captain Marvel",
    votes: 5,
    color: "rgb(255, 159, 64)"
  },
  {
    option: "Hulk",
    votes: 3,
    color: "rgb(75, 192, 192)"
  },
  {
    option: "Hawkeye",
    votes: 8,
    color: "rgb(255, 206, 86)"
  },
  {
    option: "Other",
    votes: 10,
    color: "rgb(153, 102, 255)"
  }
];

const pollForm = document.querySelector("#pollForm");

pollForm.addEventListener("submit", pollFormSubmit);

function pollFormSubmit(event) {
  event.preventDefault();
  const pollOptionInput = pollForm.querySelector(
    "input[name='pollOptions']:checked"
  );
  if (pollOptionInput) {
    const pollOptionValue = pollOptionInput.value;
    pollData.find((pollOption) => pollOption.option === pollOptionValue)
      .votes++;
    pollChart.data.datasets[0].data = pollData.map(
      (pollOption) => pollOption.votes
    );
    pollChart.update();
    pollForm.reset();
  }
}

function rgbToRgba(rgb, alpha = 1) {
  return `rgba(${rgb
    .substring(rgb.indexOf("(") + 1, rgb.length - 1)
    .split(",")
    .join()}, ${alpha})`;
}

const ctx = document.getElementById("chart").getContext("2d");
const pollChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: pollData.map((pollOption) => pollOption.option),
    datasets: [
      {
        label: "# of Votes",
        data: pollData.map((pollOption) => pollOption.votes),
        backgroundColor: pollData.map((pollOption) =>
          rgbToRgba(pollOption.color, 0.75)
        ),
        borderWidth: 3
      }
    ]
  },
  options: {
    indexAxis: "y",
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    title: {
      display: true,
      text: "Favorite Superheroes",
      fontColor: "#333",
      fontSize: 20,
      padding: 20
    },
    legend: {
      display: false
    },
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            family: "'Bangers', cursive"
          }
        }
      }
    }
  }
});
