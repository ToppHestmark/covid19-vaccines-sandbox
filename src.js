const container = document.querySelector(".container");

const viccines = async () => {
  const res = await (
    await fetch(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json"
    )
  ).json();

  res.map((obj) => {
    const data = obj.data;
    const lastUpdate = data[data.length - 1];

    const nation = obj.country;
    const dailyVaccinated = lastUpdate.daily_vaccinations;
    const vaccinationsPerMillion = lastUpdate.daily_vaccinations_per_million;
    const fullyVaccinated =
      lastUpdate.people_fully_vaccinated === undefined
        ? "No data"
        : lastUpdate.people_fully_vaccinated;
    const peopleVaccinated =
      lastUpdate.people_vaccinated === undefined
        ? "No data"
        : lastUpdate.people_vaccinated;
    const totalVaccinated = lastUpdate.total_vaccinations;
    const totalVaccinatedInProcent =
      lastUpdate.people_fully_vaccinated_per_hundred === undefined
        ? "No data"
        : lastUpdate.people_fully_vaccinated_per_hundred + "%";
    const latestUpdateDate = lastUpdate.date;

    container.innerHTML += `
      <div class="card">
        <h3> ${nation} </h3>
        <div> Total vaccinated: <strong> ${totalVaccinated} </strong> </div>
        <div> Daily vaccinated: <strong> ${dailyVaccinated} </strong> </div>
        <div> People vaccinated: <strong> ${peopleVaccinated} </strong> </div>
        <div> Fully vaccinated: <strong> ${fullyVaccinated} </strong> </div>
        <div> Vaccinations per million: <strong> ${vaccinationsPerMillion} </strong> </div>
        <div> Vaccined in population: <strong> ${totalVaccinatedInProcent} </strong> </div>
        <div> Last updated: <strong> ${latestUpdateDate} </strong> </div>
      </div>`;
  });
};

viccines();
