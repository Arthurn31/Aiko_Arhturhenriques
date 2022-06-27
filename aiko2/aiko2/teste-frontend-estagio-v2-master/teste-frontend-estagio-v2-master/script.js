//variavel para exibir o mapa
const mymap = L.map('mapid').setView([-19.126536, -45.947756], 10)
const imprimir = []
var position = []
var state = []
var stateName = []
var Name = []
//fim das variaveis
//codigo para exibir o mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap)
//fim do cogigo de exibir o mapa
//localizações dos equipamentos

async function pop() {
  await fetch('./data/equipmentPositionHistory.json')
    .then(response => response.json())
    .then(result => {
      result.forEach(element => {
        position.push(element)
      })
    })
  // fim da função de exibir a posição do equipamento
  //inico da função de exibir o status do quipamento
  await fetch('./data/equipmentState.json')
    .then(response => response.json())
    .then(result => {
      result.forEach(element => {
        stateName.push(element)
      })
    })
  //fim da função de exibir status do equipamento
  //inico da função de exibir o estado atual do equipamento (manutenção, funcionando , parado)
  await fetch('./data/equipmentStateHistory.json')
    .then(response => response.json())
    .then(result => {
      result.forEach(element => {
        state.push(element)
      })
    })
  //fim da função de exibir estado atual dos equipamentos
  //função para exibir data do equipamento
  await fetch('./data/equipment.json')
    .then(response => response.json())
    .then(result => {
      result.forEach(element => {
        Name.push(element)
      })
    })

  Show()
}

function Show() {
  position.forEach(equipament => {
    let data
    equipament.positions.forEach(e => {
      state.forEach(element => {
        let data = []
        element.states.forEach(e => {
          data.push({ data: e.date, id: e.equipmentStateId })
        })
      })
    })

    equipament.positions.forEach(e => {
      Name.forEach(N => {
        if (N.id === equipament.equipmentId) {
          stateName.forEach(element => {
            if (stateName.id === e.equipmentStateId) {
              L.marker([e.lat, e.lon])
                .addTo(mymap)
                .bindPopup(
                  `Nome:${N.name} \n Ultima data: ${e.date}\n Estado: ${element.name} `
                )
            }
          })
        }
      })
    })
  })
}

pop()
