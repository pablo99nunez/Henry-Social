export default function getTime(): string {
    const hours =
      new Date(Date.now()).getHours().toString().length == 1
        ? `0${new Date(Date.now()).getHours()}`
        : new Date(Date.now()).getHours();
    const minutes =
      new Date(Date.now()).getMinutes().toString().length == 1
        ? `0${new Date(Date.now()).getMinutes()}`
        : new Date(Date.now()).getMinutes();
    return hours + ":" + minutes;
}