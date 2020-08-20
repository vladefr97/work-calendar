define('calendar', ['jquery', 'calendarCell'], function ($, CalendarCell) {

    const TextTime = function (hour, minutes) {
        this.hour = hour;
        this.minutes = minutes;
        this.getHour = () => {
            return this.hour;
        }
        this.getMinutes = () => {
            return this.minutes;
        };

        this.getHourString = () => {
            if (this.hour < 10)
                return `0${this.hour}`;
            else return `${this.hour}`
        };
        this.getMinutesString = () => {
            if (this.minutes < 10)
                return `0${this.minutes}`;
            else return `${this.minutes}`
        };
    }
    return function (config) {

        this.view = {
            _init: () => {
                let domRows = $(this.data.calendarSelector).find(this.data.rowSelector);
                $.each(domRows, (index, row) => {
                    let calendarCells = [];
                    $.each($(row).find(this.data.cellSelector), (index, cell) => {
                        calendarCells.push(new CalendarCell(cell));
                    })
                    this.data.rows.push(calendarCells);
                })
            },
            _getHeadCellHTML(time, isHalfed) {
                if (isHalfed)
                    return `<th class=" right time"><span class="time">${time.getHourString()} <sup><small>${time.getMinutesString()}</small></sup> </span><div class="custom-border half"></div></th>`;
                else return `<th class=" right time">${time.getHourString()} <sup><small>${time.getMinutesString()}</small></sup> <div class="custom-border"></div></th>`;
            },
            _getEmptyHeadCellHTML(isHalfed) {
                if (isHalfed)
                    return `<th class=" right time"> <sup><small></small></sup> <div class="custom-border half"></div></th>`;
                else return `<th class=" right time"> <sup><small></small></sup> <div class="custom-border"></div></th>`;
            }

        }
        this.data = {
            defaultConfig: {
                calendarSelector: '.calendar__table',
                rowSelector: '.calendar__row',
                cellSelector: '.calendar__cell',
                headRowSelector: '.calendar__header',
                headCellSelector: 'th.time',
                headFullCellHTML: ' <th class="full right">11 <sup><small>30</small></sup> <div class="custom-border half"></div></th>',
                headHalfCellHTML: '<th class="half right">11 <sup><small>30</small></sup> <div class="custom-border half"></div></th>',
                cellHTML: '<td class="calendar__cell"></td>',
                halfCellHTML: '<td class="calendar__cell half-time"></td>'
            },
            DAY_HOURS: 24,
            MINUTES_SPLITTER: 30,
            startTime: undefined,
            endTime: undefined,
            rows: [],
            calendarSelector: undefined,
            rowSelector: undefined,
            cellSelector: undefined,
            _init: () => {
                this.data._readConfiguration();
            },
            _readConfiguration: () => {
                if (config === undefined)
                    this.data._readFromDefaultConfig();
                else this.data._readFromConfig();
            },
            _readFromDefaultConfig: () => {
                this.data.calendarSelector = this.data.defaultConfig.calendarSelector;
                this.data.rowSelector = this.data.defaultConfig.rowSelector;
                this.data.cellSelector = this.data.defaultConfig.cellSelector;
                this.data.cellHTML = this.data.defaultConfig.cellHTML
                this.data.halfCellHTML = this.data.defaultConfig.halfCellHTML;
                this.data.headRowSelector = this.data.defaultConfig.headRowSelector;
                this.data.headCellSelector = this.data.defaultConfig.headCellSelector;
                this.data.headFullCellHTML = this.data.defaultConfig.headFullCellHTML;
                this.data.headHalfCellHTML = this.data.defaultConfig.headHalfCellHTML;
            },
            _readFromConfig: () => {
                this.data.calendarSelector = config.calendarSelector;
                this.data.rowSelector = config.rowSelector;
                this.data.cellSelector = config.cellSelector;
                this.data.cellHTML = config.cellHTML;
                this.data.halfCellHTML = config.halfCellHTML;
                this.data.headRowSelector = this.data.config.headRowSelector;
                this.data.headCellSelector = this.data.defaultConfig.headCellSelector;
                this.data.headFullCellHTML = this.data.config.headFullCellHTML;
                this.data.headHalfCellHTML = this.data.config.headHalfCellHTML;
            },
        }
        this.init = () => {
            // this.data._readConfiguration();
            this.data._init();
            this.view._init();
        };
        this.clear = () => {
            $.each(this.data.rows, (index, row) => {
                $.each(row, (i, cell) => {
                    cell.resetActive();
                })
            })
        };
        this.fill = () => {
            $.each(this.data.rows, (index, row) => {
                $.each(row, (i, cell) => {
                    cell.setActive();
                })
            })
        };
        this.limitByTimeInterval = (startTime, endTime) => {
            this.data.startTime = this._convertTextTimeToIntDict(startTime);
            this.data.endTime = this._convertTextTimeToIntDict(endTime);
            this.removeAllHeadCells();
            this.removeAllRowCells();
            this._createCellsByTimes(this._getCellsBetweenTimes())
        };
        this.removeAllRowCells = function () {
            const domRows = $(this.data.calendarSelector).find(this.data.rowSelector);
            $.each(domRows, (index, row) => {
                $(row).find(this.data.cellSelector).remove();
                this.data.rows[index] = [];
            })
        };
        this.removeAllHeadCells = function () {
            $(this.data.headCellSelector).remove();
        };
        this.appendColumn = function (isHalfed) {
            let cellHTML = isHalfed === undefined ? this.data.cellHTML : this.data.halfCellHTML;
            const domRows = $(this.data.calendarSelector).find(this.data.rowSelector);
            $.each(domRows, (index, row) => {
                $(row).append(cellHTML);
                this.data.rows[index].push(new CalendarCell($(row).find(this.data.cellSelector).last()))
            })
        };

        this.appendColumnHeader = function (headerTime, isHalfed) {
            let cellHTML = this.view._getHeadCellHTML(headerTime, isHalfed);
            $(this.data.headRowSelector).append(cellHTML);
        }

        this.appendEmptyColumnHeader = function (isHalfed) {
            let cellHTML = this.view._getEmptyHeadCellHTML(isHalfed);
            $(this.data.headRowSelector).append(cellHTML);
        }
        this.deleteColumn = function () {
            const domRows = $(this.data.calendarSelector).find(this.data.rowSelector);
            $.each(domRows, (index, row) => {
                $(row).find(this.data.cellSelector).last().remove();
                this.data.rows[index].pop();
            })

        };
        this._convertTextTimeToIntDict = function (textTime) {
            let times = textTime.split(':');
            return new TextTime(parseInt(times[0]), parseInt(times[1]));
        };
        this._createCellsByTimes = function (cells) {
            let time = this.data.startTime;
            let wroteHeadersCount = 0;
            if (cells.withFirstHalfCell) {
                this.appendColumnHeader(time, true);
                this.appendColumn(true);
                time.minutes = 0;
                time.hour++;
                time.hour = time.hour >= 24 ? 0 : time.hour;
                wroteHeadersCount++;
            }
            for (let i = 0; i < cells.fullCellsCount; i++) {
                if (wroteHeadersCount % 2 === 0)
                    this.appendColumnHeader(time, true);
                else this.appendEmptyColumnHeader(false);
                this.appendColumn();
                time.hour++;
                wroteHeadersCount++;
                time.hour = time.hour >= 24 ? 0 : time.hour;
            }
            if (cells.withLastHalfCell) {
                time.minutes = 30;
                this.appendColumnHeader(time, true);
                this.appendColumn(true);
            }
            $(this.data.headCellSelector).last().addClass('last');
        };

        this._getCellsBetweenTimes = function () {
            let hoursCount = 0,
                withFirstHalfCell = false,
                withLastHalfCell = false,
                start = {...this.data.startTime},
                end = {...this.data.endTime};
            if (end.hour < start.hour) {
                end.hour += this.data.DAY_HOURS;
            } else if (end.hour === start.hour && end.minutes > start.minutes)
                end.hour += this.data.DAY_HOURS;
            if (start.minutes >= 30) {
                withFirstHalfCell = true;
                start.hour++;
            }
            withLastHalfCell = end.minutes >= 30;
            hoursCount = end.hour - start.hour;
            return {
                withFirstHalfCell: withFirstHalfCell,
                fullCellsCount: hoursCount,
                withLastHalfCell: withLastHalfCell
            }
        }
    };
})

