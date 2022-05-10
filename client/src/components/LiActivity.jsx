import React from 'react'
import { Link } from 'react-router-dom'

export const LiActivity = ({name}) => {
    // console.log(props.data)
  return (
    <li><Link to="/home">{name}</Link></li>
  )
}
