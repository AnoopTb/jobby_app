const SkillsNeeded = props => {
  const {eachSkill} = props

  return (
    <li className="each-skill-container-details">
      <img
        src={eachSkill.imageUrl}
        alt={eachSkill.name}
        className="each-skill-img-details"
      />
      <p className="heading-card3-job-Item-Card-detail">{eachSkill.name}</p>
    </li>
  )
}

export default SkillsNeeded
