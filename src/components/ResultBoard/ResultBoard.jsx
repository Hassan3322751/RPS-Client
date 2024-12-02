import React from 'react'
import './Result.css'

import Loose0 from "../../assets/file4.png"
import Loose1 from "../../assets/file1.png"
import Loose2 from "../../assets/file2.png"
import Win from "../../assets/file3.png"
import { Link } from 'react-router-dom'

const ResultBoard = ({result, score}) => {
    let background
    
    if(result === "WON"){
        background = Win
    }
    else if(result === "LOOSE"){
        if(score === 0) {
            background = Loose0
        }
        else if(score === 1) {
            background = Loose1
        }
        else if(score === 2) {
            background = Loose2
        }
    }

  return (
    <div className='container' 
        style={{background: `url("${background}")`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
    >
        <div className="controls">
            <div className='button-wrapper'>
                <Link to={'/'}>
                    <div className="button">Button</div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ResultBoard