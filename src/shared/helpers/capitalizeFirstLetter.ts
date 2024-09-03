export const capitalizeFirstLetter = (letter: string) => {
	if (!letter) return letter;
	return letter.charAt(0).toUpperCase() + letter.slice(1);
}