import React, { useEffect, useRef, useState } from 'react';
import {
  Day,
  Week,
  WorkWeek,
  Month,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule';
import { createElement, extend, closest } from '@syncfusion/ej2-base';
import './style.css';

import { DropDownList } from '@syncfusion/ej2-dropdowns';

function Schedule() {
  var scheduleObj  =  useRef(ScheduleComponent as any);
  function onHover(args: any) {
    const hoverTarget = closest(args.event.target, '.e-appointment');
    if (hoverTarget) {
      // Assigning the tooltip object to the tooltipObj variable.
      let tooltipObj = scheduleObj.current.element.ej2_instances[2];
      // Disable the tooltip to follow the mouse pointer position

      tooltipObj.mouseTrail = false;

      tooltipObj.showTipPointer = true;

      tooltipObj.tipPointerPosition = 'Middle';
      tooltipObj.offsetY = 0;
      // Setting the position to the tooltip
      tooltipObj.position = 'RightCenter';
      tooltipObj.container = '#scheduler1';
      tooltipObj.dataBind();
      console.log('helloq1');
    }
  }

  function onEventRendered(args: any) {
    args.element.style.width = parseFloat(args.element.style.width) - 30 + '%';
  }

  function eventTemplate(props: any) {
    return (
      <div className="template-wrap">
        {/* Appointment view status legend */}
        <div
          className="statusdiv"
          style={{
            background: props.statusColor,
            flex: scheduleObj.current.currentView == 'Day' ? '0 0 10%' : '0 0 40%',
          }}
        >
          {' '}
        </div>
        <div>
          <div className="subject">{props.Subject}</div>
        </div>
      </div>
    );
  }

  function onPopupOpen(args: any) {
    if (args.type === 'Editor') {
      // Create required custom elements in initial time
      if (!args.element.querySelector('.custom-field-row')) {
        let row = createElement('div', { className: 'custom-field-row' });
        let formElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(
          row,
          formElement.firstChild.firstChild
        );
        let container = createElement('div', {
          className: 'custom-field-container',
        });
        let inputEle = createElement('input', {
          className: 'e-field',
          attrs: { name: 'EventType' },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let dropDownList = new DropDownList({
          dataSource: [
            { text: 'Booked', value: 'booked' },
            { text: 'Completed', value: 'completed' },
            { text: 'No Show', value: 'no-show' },
            { text: 'Canceled', value: 'canceled' },
          ],
          fields: { text: 'text', value: 'value' },
          value: args.data.EventType,
          floatLabelType: 'Always',
          placeholder: 'Event Type',
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'EventType');
      }
    }
  }
  function onActionBegin(args: any) {
    if (args.requestType === 'toolbarItemRendering') {
      for (let i = 0; i < args.items.length; i++) {
        //  Changing the schedule Day button
        if (args.items[i].text === 'Day') {
          args.items[i].click = function (args: any) {
            alert('week clicked');
          };
        }
        // Changing the schedule Week button
        if (args.items[i].text === 'Week') {
          args.items[i].click = function (args: any) {
            alert('week clicked');
          };
        }
      }
    }
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange'
    ) {
      let data = args.data instanceof Array ? args.data[0] : args.data;
      var colorBasedonEventType =
        data.EventType == 'booked'
          ? 'gray'
          : data.EventType == 'completed'
          ? 'green'
          : data.EventType == 'no-show'
          ? 'orange'
          : 'pink';
      if (args.data instanceof Array) {
        args.data[0].statusColor = colorBasedonEventType;
      } else {
        args.data.statusColor = colorBasedonEventType;
      }
    }
  }
  function onDataBound(args: any) {
    // Checks whenever there are more than one ResourceGrouping there are not
    if (
        scheduleObj.current.getResourceCollections().length > 0 &&
      scheduleObj.current.getResourceCollections()[0].dataSource.length > 1
    ) {
      console.log(scheduleObj.current.currentView); // Get current view detail on resource update
      // disable week view
      // document.querySelector(
      //   '.e-toolbar-item.e-views.e-week'
      // ).style.pointerEvents = 'none';
      // document.querySelector(
      //   '.e-toolbar-item.e-views.e-week'
      // ).firstChild.style.background = 'darkgray';
      scheduleObj.current.currentView = 'Day'; // update Day view as current view;
    } else {
      // document.querySelector(
      //   '.e-toolbar-item.e-views.e-week'
      // ).style.pointerEvents = '';
      // document.querySelector(
      //   '.e-toolbar-item.e-views.e-week'
      // ).firstChild.style.background = '';
    }
  }
  return (
    <>
      <div className="statusBar">
        <div className="statusBarChild">
          <div className="bookedStatus"></div>
          <div className="contentChild"> Booked</div>
        </div>
        <div className="statusBarChild">
          <div className="completedStatus"></div>
          <div className="contentChild"> Completed</div>
        </div>
        <div className="statusBarChild">
          <div className="canceledStatus"></div>
          <div className="contentChild"> Canceled</div>
        </div>
        <div className="statusBarChild">
          <div className="no-showStatus"></div>
          <div className="contentChild"> No Show</div>
        </div>
      </div>
      <ScheduleComponent
        ref={(schedule: any) => (scheduleObj = schedule)}
        id="scheduler1"
        width="50%"
        height="550px"
        className = "scheduler"
        selectedDate={new Date(2019, 0, 6)}
        eventSettings={{
          dataSource: [
            {
              Id: 1,
              Subject: 'Explosion of Betelgeuse Star',
              Location:
                'Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA',
              EventType: 'no-show',
              StartTime: '2019-01-08T00:00:00.000Z',
              EndTime: '2019-01-08T00:15:00.000Z',
              statusColor: 'orange',
            },
            {
              Id: 10,
              Subject: 'Explosion of Betelgeuse Star',
              Location:
                'Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA Space Centre USA',
              EventType: 'no-show',
              StartTime: '2019-01-08T00:30:00.000Z',
              EndTime: '2019-01-08T00:59:00.000Z',
              statusColor: 'orange',
            },
            {
              Id: 2,
              Subject: 'Explosion',
              Location: 'Space Centre USA',
              EventType: 'completed',
              StartTime: '2019-01-05T22:00:00.000Z',
              EndTime: '2019-01-05T22:30:00.000Z',
              statusColor: 'green',
            },
            {
              Id: 2,
              Subject: 'Thule Air Crash Report',
              Location: 'Newyork City',
              EventType: 'booked',
              StartTime: '2019-01-07T06:30:00.000Z',
              EndTime: '2019-01-07T08:30:00.000Z',
              CategoryColor: '#357cd2',
              statusColor: 'gray',
            },
          ],
          enableTooltip: true,
          //  eventTemplate={this.eventTemplate.bind(this)}
        }}
        currentView="Week"
        hover={(args: any) => onHover(args)}
        eventRendered={(args: any) => onEventRendered(args)}
        popupOpen={(args: any) => onPopupOpen(args)}
        actionBegin={(args: any) => onActionBegin(args)}
        dataBound={(args: any) => onDataBound(args)}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
        </ViewsDirective>
        <Inject services={[Day, Week, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </>
  );
}
export default Schedule;
