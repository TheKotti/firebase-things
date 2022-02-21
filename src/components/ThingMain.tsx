import { useCallback, useMemo, useState } from 'react'

import TagCloud from './TagCloud/TagCloud'
import ThingList from './ThingList'

type Props = {
  things: Thing[]
  tags: TagItem[]
  setTags: (tags: TagItem[]) => void
  setThings: (tags: Thing[]) => void
}

const ThingMain = ({ tags, things, setTags, setThings }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Set tags as active/inactive on click
  const handleTagSelect = useCallback(
    (tag: TagItem) => {
      const updatedTags = [...tags]
      const item = updatedTags.find((x) => x.title === tag.title)
      if (!item) {
        console.error('NO TAG FOUND')
        return
      }
      const index = updatedTags.indexOf(item)
      updatedTags[index].active = !updatedTags[index].active
      setTags(updatedTags)
    },
    [setTags, tags]
  )

  const filteredItems = useMemo(() => {
    const termFiltered = things.filter(
      (x) => x.title.toUpperCase().includes(searchTerm) || x.url.toUpperCase().includes(searchTerm)
    )
    const tagFiltered =
      tags.length > 0
        ? termFiltered.filter((x) =>
            tags.filter((tag) => tag.active).every((activeTag) => x.tags.includes(activeTag.title))
          )
        : termFiltered

    return tagFiltered
  }, [searchTerm, tags, things])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}>
        <input placeholder='SEARCH' onChange={(e) => setSearchTerm(e.target.value.toLocaleUpperCase())} />
        <TagCloud tags={tags} callback={handleTagSelect} />
      </div>

      <ThingList things={filteredItems} setThings={setThings} />
    </div>
  )
}

export default ThingMain
