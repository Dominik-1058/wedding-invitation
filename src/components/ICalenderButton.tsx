//TODO: rework to fit genereal use case

import React, { useState, useEffect } from 'react';

import styles from '../css/App.module.css';

interface CalendarEventProps {
    title: string;
    start: Date;
    end: Date;
    description?: string;
    location?: string;
    reminderMinutesBeforeFirst?: number;
    reminderMinutesBeforeSecond?: number;
  }

export const ICalenderButton: React.FC<CalendarEventProps> = ({
    title,
    start,
    end,
    description,
    location,
    reminderMinutesBeforeFirst = 10080,
    reminderMinutesBeforeSecond = 1440,
  }) => {
    const handleDownload = () => {
        const formatDate = (date: Date): string => {
            return date.toISOString().replace(/-|:|\.\d+/g, '');
        };
        
        const reminderTriggerFirst = `-PT${reminderMinutesBeforeFirst}M`; // 7 days before
        const reminderTriggerSecond = `-PT${reminderMinutesBeforeSecond}M`;   // 1 day before

        const eventContent = `
            BEGIN:VCALENDAR
                VERSION:2.0
                BEGIN:VEVENT
                    SUMMARY:${title}
                        DTSTART:${formatDate(start)}
                        DTEND:${formatDate(end)}
                        DESCRIPTION:${description}
                        LOCATION:${location}
                        BEGIN:VALARM
                            TRIGGER:${reminderTriggerFirst}
                            ACTION:DISPLAY
                            DESCRIPTION:Reminder for ${title}
                        END:VALARM
                        BEGIN:VALARM
                            TRIGGER:${reminderTriggerSecond}
                            ACTION:DISPLAY
                            DESCRIPTION:Reminder for ${title}
                        END:VALARM
                END:VEVENT
            END:VCALENDAR`;

        const blob = new Blob([eventContent.trim()], { type: "text/calendar" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${title.replace(/\s+/g, "_")}.ics`;
        link.click();
    };

    return (
        <button
          onClick={handleDownload}
          style={{
            padding: "10px 20px",
            color: "white",
            border: "none",
            borderRadius: "0px",
            cursor: "pointer"
          }}
          className={styles.btn_bg}
        >
          Termin hinzufügen
        </button>
    );
};

export default ICalenderButton;
    