import '@mantine/core/styles.css';

import { ActionIcon, Box, Button, Container, Flex, MantineProvider, NumberInput, SimpleGrid, Table, Tabs, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { PenIcon, SaveIcon } from 'lucide-react'

enum Team {
  UR,
  CH,
  CO,
  VE,
  BR,
  BL,
  PR,
  PE,
  AR,
  EC,
}

const TeamFlag: { [t in Team]: string } = {
  [Team.UR]: '🇺🇾',
  [Team.CH]: '🇨🇱',
  [Team.CO]: '🇨🇴',
  [Team.VE]: '🇻🇪',
  [Team.BR]: '🇧🇷',
  [Team.BL]: '🇧🇴',
  [Team.PR]: '🇵🇾',
  [Team.PE]: '🇵🇪',
  [Team.AR]: '🇦🇷',
  [Team.EC]: '🇪🇨',
}

interface Match {
  local: Team,
  visitor: Team,
  hasPlayed: boolean,
  count: boolean,
  localGoals: number,
  visitorGoals: number,
  date: string,
}

interface Day {
  day: string,
  matches: Match[]
}

interface TablePosition {
  team: Team,
  pj: number,
  pg: number,
  pe: number,
  pp: number,
  dif: number,
  points: number
}

const roster: Day[] = [
  {
    day: 'Fecha 1',
    matches: [
      {
        local: Team.CO,
        visitor: Team.VE,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '7 de septiembre',
      },
      {
        local: Team.PR,
        visitor: Team.PE,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '7 de septiembre',
      },
      {
        local: Team.AR,
        visitor: Team.EC,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '7 de septiembre',
      },
      {
        local: Team.UR,
        visitor: Team.CH,
        hasPlayed: true,
        count: true,
        localGoals: 3,
        visitorGoals: 1,
        date: '8 de septiembre',
      },
      {
        local: Team.BR,
        visitor: Team.BL,
        hasPlayed: true,
        count: true,
        localGoals: 5,
        visitorGoals: 1,
        date: '8 de septiembre',
      },
    ],
  },

  {
    day: 'Fecha 2',
    matches: [
      {
        local: Team.CH,
        visitor: Team.CO,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '12 de septiembre',
      },
      {
        local: Team.PE,
        visitor: Team.BR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 1,
        date: '12 de septiembre',
      },
      {
        local: Team.VE,
        visitor: Team.PR,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '12 de septiembre',
      },
      {
        local: Team.BL,
        visitor: Team.AR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 3,
        date: '12 de septiembre',
      },
      {
        local: Team.EC,
        visitor: Team.UR,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 1,
        date: '12 de septiembre',
      },
    ],
  },

  {
    day: 'Fecha 3',
    matches: [
      {
        local: Team.CO,
        visitor: Team.UR,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 2,
        date: '12 de octubre',
      },
      {
        local: Team.BR,
        visitor: Team.VE,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 1,
        date: '12 de octubre',
      },
      {
        local: Team.BL,
        visitor: Team.EC,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 2,
        date: '12 de octubre',
      },
      {
        local: Team.AR,
        visitor: Team.PR,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '12 de octubre',
      },
      {
        local: Team.CH,
        visitor: Team.PE,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 0,
        date: '12 de octubre',
      },
    ],
  },

  {
    day: 'Fecha 4',
    matches: [
      {
        local: Team.EC,
        visitor: Team.CO,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '17 de octubre',
      },
      {
        local: Team.PR,
        visitor: Team.BL,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '17 de octubre',
      },
      {
        local: Team.UR,
        visitor: Team.BR,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 0,
        date: '17 de octubre',
      },
      {
        local: Team.PE,
        visitor: Team.AR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 2,
        date: '17 de octubre',
      },
      {
        local: Team.VE,
        visitor: Team.CH,
        hasPlayed: true,
        count: true,
        localGoals: 3,
        visitorGoals: 0,
        date: '17 de octubre',
      },
    ],
  },

  {
    day: 'Fecha 5',
    matches: [
      {
        local: Team.CO,
        visitor: Team.BR,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 1,
        date: '16 de noviembre',
      },
      {
        local: Team.VE,
        visitor: Team.EC,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '16 de noviembre',
      },
      {
        local: Team.BL,
        visitor: Team.PE,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 0,
        date: '16 de noviembre',
      },
      {
        local: Team.AR,
        visitor: Team.UR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 2,
        date: '16 de noviembre',
      },
      {
        local: Team.CH,
        visitor: Team.PR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '16 de noviembre',
      },
    ],
  },

  {
    day: 'Fecha 6',
    matches: [
      {
        local: Team.PR,
        visitor: Team.CO,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 1,
        date: '21 de noviembre',
      },
      {
        local: Team.UR,
        visitor: Team.BL,
        hasPlayed: true,
        count: true,
        localGoals: 3,
        visitorGoals: 0,
        date: '21 de noviembre',
      },
      {
        local: Team.PE,
        visitor: Team.VE,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 1,
        date: '21 de noviembre',
      },
      {
        local: Team.BR,
        visitor: Team.AR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 1,
        date: '21 de noviembre',
      },
      {
        local: Team.EC,
        visitor: Team.CH,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '21 de noviembre',
      },
    ],
  },

  {
    day: 'Fecha 7',
    matches: [
      {
        local: Team.BL,
        visitor: Team.VE,
        hasPlayed: true,
        count: true,
        localGoals: 4,
        visitorGoals: 0,
        date: '5 de septiembre',
      },
      {
        local: Team.AR,
        visitor: Team.CH,
        hasPlayed: true,
        count: true,
        localGoals: 3,
        visitorGoals: 0,
        date: '5 de septiembre',
      },
      {
        local: Team.UR,
        visitor: Team.PR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '6 de septiembre',
      },
      {
        local: Team.BR,
        visitor: Team.EC,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '6 de septiembre',
      },
      {
        local: Team.PE,
        visitor: Team.CO,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 1,
        date: '6 de septiembre',
      },
    ],
  },

  {
    day: 'Fecha 8',
    matches: [
      {
        local: Team.CO,
        visitor: Team.AR,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 1,
        date: '10 de septiembre',
      },
      {
        local: Team.CH,
        visitor: Team.BL,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 2,
        date: '10 de septiembre',
      },
      {
        local: Team.EC,
        visitor: Team.PE,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '10 de septiembre',
      },
      {
        local: Team.VE,
        visitor: Team.UR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '10 de septiembre',
      },
      {
        local: Team.PR,
        visitor: Team.BR,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '10 de septiembre',
      },
    ],
  },

  {
    day: 'Fecha 9',
    matches: [
      {
        local: Team.BL,
        visitor: Team.CO,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '10 de octubre',
      },
      {
        local: Team.EC,
        visitor: Team.PR,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '10 de octubre',
      },
      {
        local: Team.VE,
        visitor: Team.AR,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 1,
        date: '10 de octubre',
      },
      {
        local: Team.CH,
        visitor: Team.BR,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 2,
        date: '10 de octubre',
      },
      {
        local: Team.PE,
        visitor: Team.UR,
        hasPlayed: true,
        count: true,
        localGoals: 1,
        visitorGoals: 0,
        date: '11 de octubre.',
      },
    ],
  },

  {
    day: 'Fecha 10',
    matches: [
      {
        local: Team.CO,
        visitor: Team.CH,
        hasPlayed: true,
        count: true,
        localGoals: 4,
        visitorGoals: 0,
        date: '15 de octubre',
      },
      {
        local: Team.PR,
        visitor: Team.VE,
        hasPlayed: true,
        count: true,
        localGoals: 2,
        visitorGoals: 1,
        date: '15 de octubre.',
      },
      {
        local: Team.UR,
        visitor: Team.EC,
        hasPlayed: true,
        count: true,
        localGoals: 0,
        visitorGoals: 0,
        date: '15 de octubre.',
      },
      {
        local: Team.AR,
        visitor: Team.BL,
        hasPlayed: true,
        count: true,
        localGoals: 6,
        visitorGoals: 0,
        date: '15 de octubre.',
      },
      {
        local: Team.BR,
        visitor: Team.PE,
        hasPlayed: true,
        count: true,
        localGoals: 4,
        visitorGoals: 0,
        date: '15 de octubre.',
      },
    ],
  },

  {
    day: 'Fecha 11',
    matches: [
      {
        local: Team.UR,
        visitor: Team.CO,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de noviembre.',
      },
      {
        local: Team.PE,
        visitor: Team.CH,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de noviembre.',
      },
      {
        local: Team.VE,
        visitor: Team.BR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de noviembre.',
      },
      {
        local: Team.PR,
        visitor: Team.AR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de noviembre.',
      },
      {
        local: Team.EC,
        visitor: Team.BL,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de noviembre.',
      },
    ],
  },

  {
    day: 'Fecha 12',
    matches: [
      {
        local: Team.CO,
        visitor: Team.EC,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '19 de noviembre.',
      },
      {
        local: Team.BR,
        visitor: Team.UR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '19 de noviembre.',
      },
      {
        local: Team.BL,
        visitor: Team.PR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '19 de noviembre.',
      },
      {
        local: Team.AR,
        visitor: Team.PE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '19 de noviembre.',
      },
      {
        local: Team.CH,
        visitor: Team.VE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '19 de noviembre.',
      },
    ],
  },

  {
    day: 'Fecha 13',
    matches: [
      {
        local: Team.UR,
        visitor: Team.AR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '20 de marzo',
      },
      {
        local: Team.PE,
        visitor: Team.BL,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '20 de marzo',
      },
      {
        local: Team.BR,
        visitor: Team.CO,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '20 de marzo',
      },
      {
        local: Team.PR,
        visitor: Team.CH,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '20 de marzo',
      },
      {
        local: Team.EC,
        visitor: Team.VE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '20 de marzo',
      },
    ],
  },

  {
    day: 'Fecha 14',
    matches: [
      {
        local: Team.CO,
        visitor: Team.PR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '25 de marzo',
      },
      {
        local: Team.VE,
        visitor: Team.PE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '25 de marzo',
      },
      {
        local: Team.BL,
        visitor: Team.UR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '25 de marzo',
      },
      {
        local: Team.AR,
        visitor: Team.BR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '25 de marzo',
      },
      {
        local: Team.CH,
        visitor: Team.EC,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '25 de marzo',
      },
    ],
  },

  {
    day: 'Fecha 15',
    matches: [
      {
        local: Team.CO,
        visitor: Team.PE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '4 de junio',
      },
      {
        local: Team.VE,
        visitor: Team.BL,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '4 de junio',
      },
      {
        local: Team.PR,
        visitor: Team.UR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '4 de junio',
      },
      {
        local: Team.CH,
        visitor: Team.AR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '4 de junio',
      },
      {
        local: Team.EC,
        visitor: Team.BR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '4 de junio',
      },
    ],
  },

  {
    day: 'Fecha 16',
    matches: [
      {
        local: Team.UR,
        visitor: Team.VE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de junio',
      },
      {
        local: Team.PE,
        visitor: Team.EC,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de junio',
      },
      {
        local: Team.BR,
        visitor: Team.PR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de junio',
      },
      {
        local: Team.BL,
        visitor: Team.CH,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de junio',
      },
      {
        local: Team.AR,
        visitor: Team.CO,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de junio',
      },
    ],
  },

  {
    day: 'Fecha 17',
    matches: [
      {
        local: Team.UR,
        visitor: Team.PE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de septiembre',
      },
      {
        local: Team.CO,
        visitor: Team.BL,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de septiembre',
      },
      {
        local: Team.BR,
        visitor: Team.CH,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de septiembre',
      },
      {
        local: Team.PR,
        visitor: Team.EC,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de septiembre',
      },
      {
        local: Team.AR,
        visitor: Team.VE,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '9 de septiembre',
      },
    ],
  },

  {
    day: 'Fecha 18',
    matches: [
      {
        local: Team.PE,
        visitor: Team.PR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de septiembre',
      },
      {
        local: Team.VE,
        visitor: Team.CO,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de septiembre',
      },
      {
        local: Team.BL,
        visitor: Team.BR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de septiembre',
      },
      {
        local: Team.CH,
        visitor: Team.UR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de septiembre',
      },
      {
        local: Team.EC,
        visitor: Team.AR,
        hasPlayed: false,
        count: false,
        localGoals: 0,
        visitorGoals: 0,
        date: '14 de septiembre',
      },
    ],
  },
]

function getHomeMatchesByTeam(team: Team, roster: Day[]): Match[] {
  return roster
    .flatMap(day => day.matches)
    .filter(match => match.local === team);
}

function getVisitorMatchesByTeam(team: Team, roster: Day[]): Match[] {
  return roster
    .flatMap(day => day.matches)
    .filter(match => match.visitor === team);
}

const calculateTable = (roster: Day[]): TablePosition[] => {
  const tablePositions: TablePosition[] = [];

  (Object.keys(Team) as (keyof typeof Team)[]).forEach((team) => {
    if (!isNaN(Number(team))) {
      const home = getHomeMatchesByTeam(Number(team), roster).filter(({ hasPlayed, count }) => hasPlayed || count)
      const visitor = getVisitorMatchesByTeam(Number(team), roster).filter(({ hasPlayed, count }) => hasPlayed || count)
      const pg = home.filter(({ localGoals, visitorGoals }) => localGoals > visitorGoals).length + visitor.filter(({ localGoals, visitorGoals }) => localGoals < visitorGoals).length;
      const pe = [...home, ...visitor].filter(({ localGoals, visitorGoals }) => localGoals === visitorGoals).length;
      const pp = home.filter(({ localGoals, visitorGoals }) => localGoals < visitorGoals).length + visitor.filter(({ localGoals, visitorGoals }) => localGoals > visitorGoals).length;
      const dif = home.map(({ localGoals, visitorGoals }) => localGoals - visitorGoals).reduce((a, c) => a + c, 0) + visitor.map(({ localGoals, visitorGoals }) => visitorGoals - localGoals).reduce((a, c) => a + c, 0)
      tablePositions.push({
        team: Number(team),
        pj: home.length + visitor.length,
        pg,
        pe,
        pp,
        dif,
        points: (pg * 3) + (pe)
      })
    }
  });

  tablePositions.sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points
    return b.dif - a.dif
  })

  return tablePositions
}

export default function App() {
  const [rosterMain, setRosterMain] = useState(roster);
  useEffect(() => console.log('rosterMain', rosterMain), [rosterMain])
  const tablePositions = useMemo(() => calculateTable(rosterMain), [rosterMain]);

  return <MantineProvider>
    <header className="header">
      <Container size="md" className="inner">
        <Title ta="center">La calculadora</Title>
      </Container>
    </header>
    <Container size="xl">
      <SimpleGrid
        cols={{ base: 1, md: 2, }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        <Box>
          <Tabs orientation='vertical' defaultValue={'10'}>
            <Tabs.List>
              {rosterMain.map(({ day }, idx) => (
                <Tabs.Tab value={idx + ''} key={day}>{day}</Tabs.Tab>
              ))}
            </Tabs.List>
            {rosterMain.map(({ matches }, idx) => (
              <Tabs.Panel value={idx + ''} key={JSON.stringify(matches)}>
                <Flex align="center" h="100%" w="100%" justify="center" direction="column">
                  <SimpleGrid cols={1} p={20} spacing={60}>
                    {matches.map((match, midx) => (
                      <Flex justify="center" align="center" gap={10} key={JSON.stringify(match)}>
                        <Title>{TeamFlag[match.local]}</Title>
                        <NumberInput
                          value={match.localGoals}
                          disabled={match.hasPlayed || match.count}
                          key={(match.hasPlayed || match.count) + ''}
                          hideControls={match.hasPlayed}
                          allowNegative={false}
                          allowDecimal={false}
                          onChange={(value) => setRosterMain((old) => { const copy = [...old]; copy[idx].matches[midx].localGoals = Number(value); return copy })}
                          w={80}
                        />
                        <NumberInput
                          value={match.visitorGoals}
                          disabled={match.hasPlayed || match.count}
                          hideControls={match.hasPlayed}
                          allowNegative={false}
                          allowDecimal={false}
                          onChange={(value) => setRosterMain((old) => { const copy = [...old]; copy[idx].matches[midx].visitorGoals = Number(value); return copy })}
                          w={80}
                        />
                        <Title>{TeamFlag[match.visitor]}</Title>
                        {!rosterMain[idx].matches[midx].hasPlayed && <ActionIcon
                          variant='light'
                          disabled={match.hasPlayed}
                          color={rosterMain[idx].matches[midx].count ? 'green' : 'blue'}
                          onClick={() => setRosterMain((old) => { const copy = [...old]; copy[idx].matches[midx].count = !copy[idx].matches[midx].count; return copy })}
                        >
                          {(rosterMain[idx].matches[midx].count) ? <PenIcon size={20} /> : <SaveIcon size={20} />}
                        </ActionIcon>}
                      </Flex>
                    ))}
                  </SimpleGrid>
                  <Button color='red' onClick={() => setRosterMain(roster)}>Limpiar</Button>
                </Flex>
              </Tabs.Panel>
            ))}
          </Tabs>
        </Box>
        <Box>
          <Table fz="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th ta="center">Sl.</Table.Th>
                <Table.Th ta="center">PJ</Table.Th>
                <Table.Th ta="center">PG</Table.Th>
                <Table.Th ta="center">PE</Table.Th>
                <Table.Th ta="center">PP</Table.Th>
                <Table.Th ta="center">Dif.</Table.Th>
                <Table.Th ta="center">Puntos</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tablePositions.map((p, idx) => (
                <Table.Tr bg={idx < 6 ? "var(--mantine-color-green-1)" : idx === 6 ? 'var(--mantine-color-blue-1)' : ''} key={JSON.stringify(p)}>
                  <Table.Td>{idx + 1}</Table.Td>
                  <Table.Td ta="center" fz={25}>{TeamFlag[p.team]}</Table.Td>
                  <Table.Td ta="center">{p.pj}</Table.Td>
                  <Table.Td ta="center">{p.pg}</Table.Td>
                  <Table.Td ta="center">{p.pe}</Table.Td>
                  <Table.Td ta="center">{p.pp}</Table.Td>
                  <Table.Td ta="center">{p.dif}</Table.Td>
                  <Table.Td ta="center">{p.points}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </Container>
  </MantineProvider>;
}