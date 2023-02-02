import {
  SkillDiv,
  TitleH3,
  List,
} from '../../assets/styled-components/home/Skill';

const Skill = ({ title, list } : SkillProps) => {
  return (
    <SkillDiv>
      <TitleH3>{title}</TitleH3>
      <List>
        {list.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </List>
    </SkillDiv>
  );
};

export default Skill;

type SkillProps = {
  title: string,
  list: Array<string>,
};
