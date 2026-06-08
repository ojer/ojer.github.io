/*global document */
(() => {
  const testDate = "";
  if (testDate) {
    this.Date = new Proxy(globalThis.Date, {
      construct(target, args) {
        if (args.length === 0) {
          args.push(testDate);
        }
        return new target(...args);
      },
    });

    Date.now = new Proxy(Date.now, {
      apply: function () {
        return new Date(testDate).getTime();
      },
    });
  }

  const SOLAR_TERM_NAME = [
    ...["立春", "雨水", "驚蟄", "春分", "清明", "穀雨"],
    ...["立夏", "小滿", "芒種", "夏至", "小暑", "大暑"],
    ...["立秋", "處暑", "白露", "秋分", "寒露", "霜降"],
    ...["立冬", "小雪", "大雪", "冬至", "小寒", "大寒"],
  ];

  // 节气对应阳历日期
  const SOLAR_TERM_DATE = {
    2026: [
      ...["02-04", "02-18", "03-05", "03-20", "04-05", "04-20"],
      ...["05-05", "05-21", "06-05", "06-21", "07-07", "07-23"],
      ...["08-07", "08-23", "09-07", "09-23", "10-08", "10-23"],
      ...["11-07", "11-22", "12-07", "12-22", "01-05", "01-20"],
    ],
    2027: [
      ...["02-04", "02-19", "03-06", "03-21", "04-05", "04-20"],
      ...["05-06", "05-21", "06-06", "06-21", "07-07", "07-23"],
      ...["08-08", "08-23", "09-08", "09-23", "10-08", "10-23"],
      ...["11-07", "11-22", "12-07", "12-22", "01-05", "01-20"],
    ],
    2028: [
      ...["02-04", "02-19", "03-05", "03-20", "04-04", "04-19"],
      ...["05-05", "05-20", "06-05", "06-21", "07-06", "07-22"],
      ...["08-07", "08-22", "09-07", "09-22", "10-08", "10-23"],
      ...["11-07", "11-22", "12-06", "12-21", "01-06", "01-20"],
    ],
  };

  const LUNAR_FESTIVAL = [
    [
      "正月初一",
      "正月十五",
      "五月初五",
      "七月初七",
      "七月十五",
      "八月十五",
      "九月初九",
      "腊月初八",
      "腊月廿三",
    ],
    [
      "春节",
      "元宵",
      "端午",
      "七夕",
      "中元",
      "中秋",
      "重阳",
      "腊八",
      "小年",
      "除夕",
    ],
  ];

  const FESTIVAL = Object.entries({
    "01-01": "元旦",
    "03-12": "植树节",
    "03-08": "妇女节",
    "05-01": "劳动节",
    "05-04": "青年节",
    "05-12": "护士节",
    "06-01": "儿童节",
    "07-01": "建党节",
    "08-01": "建军节",
    "09-10": "教师节",
    "10-01": "国庆节",
  }).reduce(
    (a, c) => [
      [...a[0], c[0]],
      [...a[1], c[1]],
    ],
    [[], []],
  );

  const STATUTORY_HOLIDAYS_DAYS = {
    2026: [
      // 元旦1月1日周四至3日周六放假调休共3天
      // 1月4日周日上班
      [["01-01", "01-02", "01-03"], ["01-04"]],
      // 春节
      // 2月15日（农历腊月二十八、周日）至23日（农历正月初七、周一）放假调休，共9天
      // 2月14日（周六）、2月28日（周六）上班。
      [
        [
          "02-15",
          "02-16",
          "02-17",
          "02-18",
          "02-19",
          "02-20",
          "02-21",
          "02-22",
          "02-23",
        ],
        ["02-14", "02-28"],
      ],
      //清明节 4月4日（周六）至6日（周一）放假，共3天。
      [["04-04", "04-05", "04-06"], []],
      //劳动节 5月1日（周五）至5日（周二）放假调休，共5天。5月9日（周六）上班。
      [["05-01", "05-02", "05-03", "05-04", "05-05"], ["05-09"]],
      // 端午节 6月19日（周五）至21日（周日）放假，共3天。
      [["06-19", "06-20", "06-21"], []],
      // 中秋节 9月25日（周五）至27日（周日）放假，共3天。
      [["09-25", "09-26", "09-27"], []],
      // 国庆节 10月1日（周四）至7日（周三）放假调休，共7天
      //  9月20日（周日）、10月10日（周六）上班
      [
        ["10-01", "10-02", "10-03", "10-04", "10-05", "10-06", "10-07"],
        ["09-20", "10-10"],
      ],
    ],
    2027: [],
    2028: [],
    2029: [],
    2030: [],
  };

  const Util = class {
    static getHolidays(year) {
      const arr = STATUTORY_HOLIDAYS_DAYS[year] ?? [];
      return arr.reduce((acc, cur) => [...acc, ...cur[0]], []);
    }

    static getWorkingDays(year) {
      const arr = STATUTORY_HOLIDAYS_DAYS[year] ?? [];
      return arr.reduce((acc, cur) => [...acc, ...cur[1]], []);
    }

    static lunarMonthDay(date) {
      let str = new Date(date).toLocaleDateString("zh-CN-u-ca-chinese", {
        calendar: "chinese",
        numberingSystem: "hanidec",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const i1 = str.indexOf("年");
      const i2 = str.indexOf("月");

      const year = str.substring(4, i1);
      let month = str.substring(i1 + 1, i2);
      let day = str.substring(i2 + 1);

      // 重赋值
      if (month === "十一") {
        month = "冬";
      }

      day = day.replace("日", "").replace("〇", "十");

      if (day.length === 1) {
        day = `初${day}`;
      } else if (day.startsWith("一")) {
        if (day === "一十") {
          day = "初十";
        } else {
          day = day.replace("一", "十");
        }
      } else if (day.startsWith("二") && day !== "二十") {
        day = day.replace("二", "廿");
      }
      return [year, month + "月", day];
    }
  };

  const Day = class {
    // 阳历日期 yyyy mm dd
    // 天数 monthDay, weekDay
    // 阴历日期 YY MM DD
    constructor(date) {
      date = new Date(date);

      [this.yyyy, this.mm, this.dd] = new Date(date.getTime() + 28800000)
        .toISOString()
        .split("T")[0]
        .split("-");

      this.monthDay = date.getDate();
      this.weekDay = date.getDay();

      // 阴历日期
      [this.YY, this.MM, this.DD] = Util.lunarMonthDay(date);
    }

    get weekName() {
      return `星期${["日", "一", "二", "三", "四", "五", "六"][this.weekDay]}`;
    }

    get isLunarMonthFirstDate() {
      return this.DD === "初一";
    }

    get isHolidays() {
      const holidays = Util.getHolidays(this.yyyy);
      return holidays.includes(`${this.mm}-${this.dd}`);
    }

    // 周末
    get isWeekend() {
      return this.weekDay === 0 || this.weekDay === 6;
    }

    get isWorkingDay() {
      const workingDays = Util.getWorkingDays(this.yyyy);
      return workingDays.includes(`${this.mm}-${this.dd}`);
    }

    // 节气, 区分年
    get solarTerm() {
      const solarTermDays = SOLAR_TERM_DATE[this.yyyy] ?? [];
      const index = solarTermDays.indexOf(`${this.mm}-${this.dd}`);
      return index === -1 ? "" : SOLAR_TERM_NAME[index];
    }

    // 节日, 不区分年
    get festival() {
      const festival = [];
      const i1 = FESTIVAL[0].indexOf(`${this.mm}-${this.dd}`);
      if (i1 !== -1) {
        festival.push(FESTIVAL[1][i1]);
      }

      const i2 = LUNAR_FESTIVAL[0].indexOf(`${this.MM}${this.DD}`);
      if (i2 !== -1) {
        festival.push(LUNAR_FESTIVAL[1][i2]);
      }

      if (this.MM === "腊月") {
        if (this.DD === "廿九" || this.DD === "三十") {
          const td = new Date(
            parseInt(this.yyyy),
            parseInt(this.mm) - 1,
            parseInt(this.dd) + 1,
          );
          const mm = Util.lunarMonthDay(td)[1];
          if (mm === "正月") {
            festival.push(LUNAR_FESTIVAL[1].at(-1));
          }
        }
      }
      return festival;
    }
  };

  const Month = class {
    // YY 乙巳
    // MM 四月
    //
    // yyyy  1845
    // mm   04
    //
    // date
    // m
    //
    // days
    constructor(dateObj) {
      let date = new Date(dateObj);
      if (Number.isNaN(date.getFullYear())) {
        date = new Date();
      }
      date.setDate(1);

      this.date = new Date(date);
      this.m = date.getMonth();

      [this.yyyy, this.mm] = new Date(date.getTime() + 28800000)
        .toISOString()
        .split("-");
      [this.YY, this.MM] = Util.lunarMonthDay(date);

      // const tempDate = new Date(date);
      // tempDate.setMonth(tempDate.getMonth() + 1, 0);
      // const monthLatestDay = tempDate.getDate();
      // this.endOfWeek = tempDate.getDay() || 7;
    }

    get days() {
      const days = [];
      const tempDate = new Date(this.date);
      tempDate.setMonth(tempDate.getMonth() + 1, 0);
      const monthLatestDay = tempDate.getDate();

      for (let i = 1; i <= monthLatestDay; i++) {
        tempDate.setDate(i);
        const day = new Day(tempDate);
        days.push(day);
      }
      return days;
    }
  };
  const loadCalendar = (month) => {
    const elTodayDate = document.getElementById("today-date");
    const elTodayLunarDate = document.getElementById("today-lunar-date");
    const elTodaySolarTerm = document.getElementById("today-solar-term");
    const elTodayFestival = document.getElementById("today-festival");

    const elYearMonth = document.getElementById("curr-month");
    const elMonthDays = document.getElementById("month-days");

    const { yyyy, mm } = month;
    const dateNow = Date.now();
    const currDayObj = new Day(dateNow);
    const {
      yyyy: currYYYY,
      mm: currMM,
      dd: currDD,
      YY: currLunarYY,
      MM: currLunarMM,
      DD: currLunarDD,
      solarTerm: currSolarTerm,
      festival: currFestival,
      weekName: cruuWeekName,
    } = currDayObj;

    elYearMonth.textContent = `${yyyy}-${mm}`;
    if (yyyy !== currYYYY || mm !== currMM) {
      elYearMonth.classList.add("oth-month");
    } else {
      elYearMonth.classList.remove("oth-month");
    }

    elTodayDate.textContent = `${currYYYY}-${currMM}-${currDD} ${cruuWeekName}`;
    elTodayLunarDate.textContent = `${currLunarYY}年 ${currLunarMM} ${currLunarDD}`;
    elTodaySolarTerm.textContent = currSolarTerm;
    elTodayFestival.textContent = currFestival.join();

    const days = month.days;
    let preDay = days.at(0).weekDay || 7;
    while (preDay > 1) {
      const div = document.createElement("div");
      div.classList.add("day");
      elMonthDays.appendChild(div);
      preDay--;
    }

    days.forEach((item) => {
      const { yyyy, mm, dd, YY, MM, DD, monthDay, solarTerm, festival } = item;

      const parent = document.createElement("div");
      const divDayNum = document.createElement("div");
      const divLunar = document.createElement("div");

      // parent
      parent.setAttribute("id", `${yyyy}-${mm}-${dd}`);
      parent.classList.add("day", "flex", "center");

      if (`${currYYYY}-${currMM}` === `${yyyy}-${mm}`) {
        parent.classList.add("current-month");
        if (currDD === dd) {
          parent.classList.add("today");
        }
      }

      // 节日
      if (festival.length > 0) {
        parent.classList.add("festival");
        parent.setAttribute("data-festival", festival.join(" "));
      }

      if (item.isHolidays) {
        // 法定假日
        parent.classList.add("statutory-holidays");
      } else if (item.isWeekend) {
        // 周末
        parent.classList.add("weekend");
        if (item.isWorkingDay) {
          // 补班
          parent.classList.add("working-day");
        }
      }

      // 阳历日期
      divDayNum.textContent = monthDay;
      divDayNum.classList.add("day-num", "flex", "center");

      // 阴历日期
      divLunar.classList.add("day-lunar");
      divLunar.textContent = DD;
      divLunar.setAttribute("date-lunar-month", MM);
      divLunar.setAttribute("date-lunar-year", YY);
      if (item.isLunarMonthFirstDate) {
        divLunar.classList.add("lunar-first-day");
        divLunar.textContent = `${MM}${DD}`;
      }

      // 节气
      if (solarTerm) {
        divLunar.classList.add("day-solar-term");
        divLunar.setAttribute("data-solar-term", solarTerm);
      }

      parent.appendChild(divDayNum);
      parent.appendChild(divLunar);
      elMonthDays.appendChild(parent);
    });

    let suf = 7 - (days.at(-1).weekDay || 7);
    while (suf > 0) {
      const div = document.createElement("div");
      div.classList.add("day");
      elMonthDays.appendChild(div);
      suf--;
    }
    return currDayObj;
  };

  const handleChangeMonth = (month) => {
    const fn = () => {
      document.getElementById("month-days").replaceChildren();
      loadCalendar(month);
    };

    if (!document.startViewTransition) {
      fn();
      return;
    }

    document.startViewTransition(() => fn());
  };

  let month = new Month();
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  {
    const toNextMonth = (num) => {
      const date = new Date(month.date);
      date.setMonth(month.m + num);
      month = new Month(date);
      handleChangeMonth(month);
      // const content = document.getElementById("month-content");
      // content.insertAdjacentHTML("beforeend", content.innerHTML);
    };

    const toNextYear = (num) => {
      const date = new Date(month.date);
      date.setFullYear(parseInt(month.yyyy) + num);
      month = new Month(date);
      handleChangeMonth(month);
    };

    const bindBtnClickEvent = () => {
      const nowBtn = document.getElementById("curr-month");
      const preMonthBtn = document.getElementById("pre-month");
      const nextMonthBtn = document.getElementById("next-month");
      const preYearBtn = document.getElementById("pre-year");
      const nextYearBtn = document.getElementById("next-year");

      const elCurrDate = document.getElementById("curr-date");
      const elCurrLunarDate = document.getElementById("curr-lunar-date");
      const elCurrSolarTerm = document.getElementById("curr-solar-term");
      const elCurrFestival = document.getElementById("curr-festival");

      nowBtn.addEventListener("click", () => {
        const date = new Date();
        month = new Month(date);
        handleChangeMonth(month);

        elCurrDate.textContent = "";
        elCurrLunarDate.textContent = "";
        elCurrSolarTerm.textContent = "";
        elCurrFestival.textContent = "";
      });
      preMonthBtn.addEventListener("click", () => toNextMonth(-1));
      nextMonthBtn.addEventListener("click", () => toNextMonth(1));
      preYearBtn.addEventListener("click", () => toNextYear(-1));
      nextYearBtn.addEventListener("click", () => toNextYear(1));
    };

    const bindTouchEvent = () => {
      const app = document.getElementById("app");

      app.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
      });

      app.addEventListener("touchend", (event) => {
        const swipeThreshold = 80;
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        if (absDeltaX > swipeThreshold) {
          toNextMonth(deltaX > 0 ? -1 : 1);
        } else if (absDeltaY > swipeThreshold) {
          toNextYear(deltaY > 0 ? -1 : 1);
        }
      });

      document.addEventListener(
        "touchmove",
        (e) => {
          e.preventDefault();
        },
        {
          passive: false,
        },
      );
    };

    const bindDayCheck = (currDayObj) => {
      const elMonthDays = document.getElementById("month-days");
      const elCurrDate = document.getElementById("curr-date");
      const elCurrLunarDate = document.getElementById("curr-lunar-date");
      const elCurrSolarTerm = document.getElementById("curr-solar-term");
      const elCurrFestival = document.getElementById("curr-festival");

      elMonthDays.addEventListener("click", (eve) => {
        const target = eve.target;
        if (target.classList.contains("day") && target.hasAttribute("id")) {
          Array.from(document.getElementsByClassName("check day")).forEach(
            (item) => item.classList.remove("check"),
          );
          target.classList.toggle("check");
          const checkDay = target.id;
          const today = `${currDayObj.yyyy}-${currDayObj.mm}-${currDayObj.dd}`;
          if (checkDay !== today) {
            const dateTmp1 = new Date(`${today}T00:00:00`);
            const dateTmp2 = new Date(`${checkDay}T00:00:00`);
            const day = new Day(dateTmp2);

            let diffDay = (dateTmp1 - dateTmp2) / 1000 / 60 / 60 / 24;
            const diffDaySuffix = Math.sign(diffDay) === 1 ? "前" : "后";
            diffDay = Math.abs(diffDay);

            elCurrDate.textContent = `${day.yyyy}-${day.mm}-${day.dd} ${day.weekName}`;
            elCurrLunarDate.textContent = `${day.YY}年 ${day.MM} ${day.DD}`;
            elCurrSolarTerm.textContent = day.solarTerm;
            elCurrFestival.innerText = `${day.festival.join(" ")}\n${diffDay} 天之${diffDaySuffix}`;
          } else {
            elCurrDate.textContent = "";
            elCurrLunarDate.textContent = "";
            elCurrSolarTerm.textContent = "";
            elCurrFestival.textContent = "";
          }
        }
      });
    };

    const main = () => {
      const currDayObj = loadCalendar(month);
      bindBtnClickEvent();
      bindTouchEvent();
      bindDayCheck(currDayObj);
    };

    main();
  }
})();
