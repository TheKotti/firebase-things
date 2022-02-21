import './TagCloud.scss'

type Props = {
  tags: TagItem[]
  callback: (tagItem: TagItem) => void
}

type TagProps = {
  tag: TagItem
  callback: (tagItem: TagItem) => void
}

const Tag = ({ tag, callback }: TagProps) => {
  return (
    <div className={`k_tag ${tag.active && 'active'}`} onClick={() => callback(tag)}>
      {tag.title}
    </div>
  )
}

const TagCloud = ({ tags, callback }: Props) => {
  return (
    <div className='k_tagcloud'>
      {tags
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((tag) => {
          return <Tag key={tag.title} tag={tag} callback={callback} />
        })}
    </div>
  )
}

export default TagCloud
