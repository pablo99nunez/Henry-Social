export const getMomento = (value : string) => {

	const datePost = new Date(value);
	
	const toMiliseconds = (el : Date) => Date.parse(`${el}`);

	const minutesDiference = (el : Date) => {
		const diference = toMiliseconds(new Date()) - toMiliseconds(el);
		return Math.floor(diference * (1 / 60000));
	}

	const minutes = minutesDiference(datePost);
	if(minutes < 2) return 'hace un momento';
	if(minutes < 60) return `${minutes}m`

	const hours = Math.floor(minutes / 60);
	if(hours < 24) return `${hours}h`;

	const days = Math.floor(hours / 24);
	if(days < 7) return `${days}d`;

	const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

	if(days < 365) return `${datePost.getDate()} ${months[datePost.getMonth()]}`;

	return `${datePost.getDate()} ${months[datePost.getMonth()]} ${datePost.getFullYear()}`;
}
