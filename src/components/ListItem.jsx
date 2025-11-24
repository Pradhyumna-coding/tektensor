import React from 'react';
import './ListItem.css'; // Assuming you have this CSS file
import { Link } from 'react-router-dom';
import GradientBorderDiv from './GradientBorder';


export const ListItem = ({ details, type }) => { // Destructure props
    if (type == "blog") return (
        <GradientBorderDiv radius={20}>
            <div background-image={details.image} className='card blog'>
                <div className='blog-text-div' style={{ top: "10px" }}>
                    <p className='blog-author'>{details.author}</p>
                    <p className='blog-date'>{details.date}</p>
                </div>

                <div className='blog-text-div' style={{ bottom: "10px" }}>
                    <p className='card-heading'>{details.name}</p>
                    <p className='card-text'>{details.desc}</p>
                </div>
            </div>
        </GradientBorderDiv>
    )
    if (type == "detailed") {
        const [description, date] = details.desc.split('\n\n');
        return (
            <GradientBorderDiv radius={20}>
                <div className='card detailed'>
                    {details.image ? <img src={details.image} className='card-image' /> : null}

                    <p className='card-heading' style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <span class="material-symbols-outlined" style={{ color: details.iconColor, minWidth: 'fit-content' }}>
                            {details.iconText}
                        </span>
                        <span>{details.name}</span>
                    </p>
                    <p className='card-text'>{description}</p>
                    {date && <p className='card-text' style={{ color: 'white', marginTop: 'auto' }}>{date}</p>}
                    {details.readMore ? <ReadMore url={details.url} text={details.readMore} /> : null}
                </div>
            </GradientBorderDiv>
        )
    }
}



export const Chip = ({ iconText, text, color }) => { // Destructure props
    return (
        <div className='chip' style={{ border: `1px solid ${color}`, color: `${color}` }}>
            <span className="material-symbols-outlined">
                {iconText ? iconText : null}
            </span>
            {text}

        </div>
    );
}

export const ReadMore = ({ url, text = "Read More" }) => { // Destructure props
    return (
        <div >
            <Link to={url} className='read-more'>
                {text}
                <span class="material-symbols-outlined">
                    arrow_forward
                </span>
            </Link>
        </div>
    );
}
