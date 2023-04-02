
export interface Observer {
  eventName: string; 
  listener: (e: CustomEvent)=>void;
}

/**
 * Clase encargada de mediar entre distintos eventos 
 */
export class MyEventMediator {
  private eventEmitter: EventTarget;
  private observers: Observer[] = [];
  
  constructor() {
    // crea un objeto target de eventos personalizado
    this.eventEmitter = new EventTarget()
  }
  
  /**
   * Método encargado de emitir el evento, en este método
   * podemos propagar un evento dado, enviando datos por una propiedad detail
   */
  emit<T>(eventName: string, detail: T ) {
    // haz algo aquí
    this.eventEmitter.dispatchEvent(new CustomEvent(eventName, {detail}));
  }
  
  /**
   * Método que subscribe un observer a un evento personalizado,
   */
  on(eventName: string, listener: (e: CustomEvent)=>void ) {
    this.eventEmitter.addEventListener(eventName, listener as EventListener);
    const newObserver = {eventName,listener}
    if(!this.observers.includes(newObserver)){
      this.observers.push(newObserver)
    }else throw new Error('observer existente: el observer que intenta subscribir ya se encuentra en existencia')
  }
  /**
   *  método para eliminar un EventListener del evento personalizado
   */
  off(eventName: string, listener: (e: CustomEvent)=>void) {
    const observer = {eventName,listener}
    if(!this.observers.includes(observer)) throw new Error('el presente observer no existe en el presente mediador');

    this.eventEmitter.removeEventListener(eventName, listener as EventListener);
    this.observers = this.observers.filter((o)=>observer !== o);
  }
  /**
   * método para eliminar todos los eventos de la presente instancia
   */
  offAll() {
    this.observers.forEach((o=>{
      this.eventEmitter.removeEventListener(o.eventName, o.listener as EventListener);
    }));
  }
}