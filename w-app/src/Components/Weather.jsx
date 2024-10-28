import React, { Component } from 'react'
import Day from './Day'
export default class Weather extends Component {
    // key = { index } > { this.props.formatDay(d) }
    render() {
        let { time, weathercode: code, temperature_2m_max: max, temperature_2m_min: min } = this.props.weather
        return (
            <><strong className='heading'>Weather Report</strong>
                <div className='weatherbox'>
                    {time.map((index, i) => (
                        <Day key={index}
                            max={max.at(i)}
                            min={min.at(i)}
                            code={code.at(i)}
                            time={this.props.formatDay(index)}
                            timing={time.at(0)}
                        />
                    ))}
                </div>


            </>
        )
    }
}
