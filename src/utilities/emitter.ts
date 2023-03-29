export class MyEmitter {
  private eventEmitter: EventTarget;
  
  constructor() {
    // crea un objeto target de eventos personalizado
    this.eventEmitter = new EventTarget()
  }
  
  // método que emite un evento personalizado
  emit<T>(eventName: string, detail: T) {
    // haz algo aquí
    this.eventEmitter.dispatchEvent(new CustomEvent(eventName, {detail}));
  }
  
  // método para agregar un EventListener al evento personalizado
  on(eventName: string, listener: (e: CustomEvent)=>void ) {
    this.eventEmitter.addEventListener(eventName, listener as EventListener);
  }
  // método para eliminar un EventListener del evento personalizado
  off(eventName: string, listener: (e: CustomEvent)=>void) {
    this.eventEmitter.removeEventListener(eventName, listener as EventListener);
  }
}