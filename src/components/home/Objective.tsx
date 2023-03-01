import {
  CardObjectives,
  CardImage,
  TextP,
} from '../../assets/styled-components/home/Objective'
import { List } from '../../assets/styled-components/home/Skill'

const Objective = ({
  img,
  paragraph,
  listed,
  elements,
}: ObjectiveProps): JSX.Element => {
  return (
    <CardObjectives>
      <CardImage src={img} alt='goal image'></CardImage>
      <TextP>{paragraph}</TextP>
      {listed && (
        <List>
          {elements?.map((list, index) => {
            return <li key={index}>{list}</li>
          })}
        </List>
      )}
    </CardObjectives>
  )
}

export default Objective

interface ObjectiveProps {
  img: string
  paragraph: string
  listed: boolean
  elements?: string[]
}
