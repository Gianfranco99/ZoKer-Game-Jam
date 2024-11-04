import { Background, Button, Header } from '@/components';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

export default function Summary() {
  const { getItem } = useSessionStorage();
  const winnings = getItem('bet-value') || 1;

  const router = useRouter();
  const goToMainMenu = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      {/* Background component */}
      <Background image="/backgrounds/striped-screen-light.svg" />

      {/* Header component */}
      <Header title="match summary" backButton={false} />

      <div className="summary-overlay">
        {/* Game end indicator */}
        <Image
          className="summary-victory"
          src="/text/victory.png"
          alt="Victoy 2-1 image"
          width={635}
          height={214}
        />

        <div className="summary-winnings">
          <p>You earn {winnings}</p>
          <Image
            src="/currency/starknet-token.png"
            alt="Winning trophy icon"
            width={50}
            height={50}
          />
        </div>

        {/* Summary component */}
        <table className="summary-table">
          <thead>
            <tr>
              <th></th>
              <th>
                <Image
                  src="/teams/team-a.svg"
                  alt="Summary icon"
                  width={60}
                  height={60}
                />
              </th>
              <th>
                <Image
                  src="/teams/team-b.svg"
                  alt="Summary icon"
                  width={60}
                  height={60}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ball possession</td>
              <td className="highlighted">67%</td>
              <td>33%</td>
            </tr>
            <tr>
              <td>Shoots</td>
              <td className="highlighted">2</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Aimed Shoots</td>
              <td className="highlighted">2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Fouls</td>
              <td>5</td>
              <td className="highlighted">2</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Main Menu button */}
      <div className="summary-button">
        <Button size="large" onClick={goToMainMenu}>
          Main Menu
        </Button>
      </div>
    </>
  );
}
