const tagMap = {
  economy: { name: 'economy', badge: 'badge-gold' },
  'justice & equality': { name: 'justice & equality', badge: 'badge-purple' },
  government: {
    name: 'government',
    badge: 'badge-cyan',
  },
  environment: { name: 'environment', badge: 'badge-green' },
}

const getTagData = (tag = '') => {
  return (
    tagMap[tag.toLowerCase()] || {
      name: tag,
      badge: 'badge-default',
    }
  )
}

export default getTagData
