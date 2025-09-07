# Breaker

## Features

- [ ] Calendar to view breaker results
  - [ ] Filter view
  - [ ] View day results
  - [ ] Edit day data
- [ ] CRUD breakers
- [ ] Edit profile
- [ ] Invite support
- [ ] Form for current day results
- [ ] Alerts for reminders to check in
- [ ] Daily result sent to support
- [ ] Graphs
- [ ] Emergency button
- [ ] Set Notification times
- [ ] Email sending
- [ ] S3 bucket for storing pictures

---

## Data structure

- User
  - ... Auth stuff
  - Profile Pic: string

- Breaker
  - Name: string
  - Motivations -> Motivation
  - Days -> Day
  - Support -> User
  - Notifications -> [Notification]

- Day
  - Breaker -> Breaker
  - Notes: string

- Classification
  - Emoji: string
  - Description: string
  - Level: number
  - Breaker -> Breaker

- Motivation
  - Name: string
  - Description: string
  - Picture: string

- Notifications
  - Time: datetime
  - SendTo -> [Users]

---

## Routes

- /home
- /about
- /signup
- /login
- /app
  - /home
    - Add breakers
    - Manage profile
    - Current day form
    - Total calender
    - Graphs
  - /breaker/[breaker]
    - Update
    - Delete
    - Calender
  -
