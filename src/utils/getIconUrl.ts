const getIconUrl = (iconId: string, size = 4) => {
  return `https://openweathermap.org/img/wn/${iconId}@${size}x.png`
}

export default getIconUrl
