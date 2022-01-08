import React from 'react'

function Clock({ timerDays, timerHours, timerMinutes, timerSeconds }) {
    return <div id="clock">
        <section className="timer-container">
            <section className="timer">
                <div className="clock">
                    <section>
                        <p>{timerDays}</p>
                        <small>Days</small>
                    </section>{" "}
                    <span>:</span>
                    <section>
                        <p>{timerHours}</p>
                        <small>Hours</small>
                    </section>{" "}
                    <span>:</span>

                    <section>
                        <p>{timerMinutes}</p>
                        <small>Minutes</small>
                    </section>{" "}
                    <span>:</span>
                    <section>
                        <p>{timerSeconds}</p>
                        <small>Seconds</small>
                    </section>
                </div>
            </section>
        </section>
    </div>
}


Clock.defaultProps = {
    timerDays: 0,
    timerHours: 0,
    timerMinutes: 0,
    timerSeconds: 0,
}

export default Clock
