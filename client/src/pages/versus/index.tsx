/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import { Background, FormationCard } from '../../components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const teamsData = [
  {
    name: 'KPMNK',
    tag: 'KPMNK',
    logo: '/teams/team-a.svg',
    formation: {
      name: '4 - 4 - 2',
      attack: 80,
      defence: 75,
      middle: 50,
      image: '/formations/formation-a.svg'
    }
  },
  {
    name: 'Team B',
    tag: 'TEAM_B',
    logo: '/teams/team-b.svg',
    formation: {
      name: '4 - 3 - 3',
      attack: 60,
      defence: 75,
      middle: 60,
      image: '/formations/formation-b.svg'
    }
  }
];

export default function Versus() {
  const [versusStage, setVersusStage] = useState(0);
  const router = useRouter();
  const goToGame = () => {
    router.push('/game');
  };

  useEffect(() => {
    setTimeout(() => setVersusStage(1), 3000);
    setTimeout(() => goToGame(), 6000);
  }, []);

  return (
    <>
      {/* Background component */}
      <Background image="/backgrounds/versus-screen.svg" />

      {/* Team Views */}
      <div
        style={{
          display: 'flex'
        }}
      >
        {versusStage === 0 &&
          teamsData.map(team => (
            <div className="teamview" key={team.name}>
              <Image src={team.logo} alt={team.name} width={400} height={400} />
              <p className="team-name">{team.name}</p>
              <p className="team-tag">{team.tag}</p>
            </div>
          ))}

        {versusStage === 1 && (
          <div className="formation-wrapper">
            {teamsData.map(team => (
              <FormationCard key={team.name} {...team.formation} />
            ))}
          </div>
        )}
      </div>

      {/* Versus Text component */}
      <div className="versus-text">
        <Image src="/text/versus.png" alt="Versus" width={200} height={100} />
      </div>
    </>
  );
}
