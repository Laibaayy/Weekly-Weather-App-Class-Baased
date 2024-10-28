import React, { Component } from 'react'

export default class Day extends Component {
    render() {
        let weatherCodeToIcon = {
            0: "🌑",
            1: "☀️",
            2: "⛅",
            3: "☁️",
            45: "🌫️",
            48: "🌫️",
            51: "🌧️",
            53: "🌧️",
            55: "🌧️",
            56: "🌨️",
            57: "🌨️",
            61: "🌧️",
            63: "🌧️",
            65: "🌧️",
            66: "🌨️",
            67: "🌨️",
            71: "❄️",
            73: "❄️",
            75: "❄️",
            77: "❄️",
            80: "🌧️",
            81: "🌧️",
            82: "🌧️",
            85: "❄️",
            86: "❄️",
            95: "⛈️",
            96: "⛈️",
            99: "⛈️",
        };
        let { max, min, code, time, timing } = this.props
        let icon = weatherCodeToIcon[code]
        return (
            <div className='boxes'>
                <p className='iconn'> {icon}</p>
                <p><strong> Weather Code :</strong> {code}</p>
                <p><strong> Day:</strong> {time}</p>
                <p><strong> Time:</strong> {timing}</p>
                <p><strong>Max Temp :</strong>  {max}</p>
                <p><strong> Min Temp :</strong>  {min}</p>
            </div>
        )
    }
}
