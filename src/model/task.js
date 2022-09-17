export class Task{
    constructor(description,priority,id){
        this.description = description;
        this.priority = priority;
        this.id=id;
    }

    priorityOrder(){
        return map.get(this.priority)
    }
}
const map = new Map()

map.set('prioridad-baja',1)
map.set('prioridad-media',2)
map.set('prioridad-alta',3)
/*
priorityOrder = () =>{
    switch (this.priority) {
      case "prioridad-baja":
        return 1
      case "prioridad-media":
        return 2
      case "prioridad-alta":
        return 3
      default:
        break;
    }
  }
*/