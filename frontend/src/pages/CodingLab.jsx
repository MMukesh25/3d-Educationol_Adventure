import React, { useState } from 'react';
import { ArrowLeft, Play, RotateCcw, Plus, Trash2, Sparkles, Check } from '../components/common/Icons';
import { useNavigate } from 'react-router-dom';
import Robot3DCanvas from '../components/3d/Robot3DCanvas';
import MascotGuide from '../components/common/MascotGuide';
import { useGame } from '../context/GameContext';
import soundService from '../services/soundService';
import gameService from '../services/gameService';

const CodingLab = () => {
  const navigate = useNavigate();
  const { showCelebration } = useGame();

  // Command palette
  const commandPalette = [
    { type: 'MOVE_FORWARD', label: '⬆️ Move Forward', dx: 1, dz: 0 },
    { type: 'TURN_LEFT', label: '⬅️ Turn Left', dRot: Math.PI / 2 },
    { type: 'TURN_RIGHT', label: '➡️ Turn Right', dRot: -Math.PI / 2 },
    { type: 'JUMP', label: '🦘 Jump Over', dx: 2, dz: 0 },
  ];

  const [program, setProgram] = useState([]);
  const [robotPos, setRobotPos] = useState([0, 0]);
  const [robotAngle, setRobotAngle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Target Star Position on Grid (x=2, z=0)
  const starTarget = [2, 0];

  const handleAddCommand = (cmd) => {
    if (isRunning) return;
    soundService.playPop();
    setProgram([...program, cmd]);
  };

  const handleClear = () => {
    soundService.playPop();
    setProgram([]);
    setRobotPos([0, 0]);
    setRobotAngle(0);
    setFeedback('');
  };

  const handleRunProgram = async () => {
    if (program.length === 0 || isRunning) return;

    setIsRunning(true);
    soundService.playPop();
    setFeedback('🤖 Robo is executing your code...');

    let currentX = 0;
    let currentZ = 0;
    let currentRot = 0;
    setRobotPos([0, 0]);
    setRobotAngle(0);

    for (let i = 0; i < program.length; i++) {
      await new Promise((res) => setTimeout(res, 700));
      const cmd = program[i];

      if (cmd.type === 'MOVE_FORWARD') {
        soundService.playPop();
        // Move in direction robot is facing
        const forwardX = Math.round(Math.cos(currentRot));
        const forwardZ = Math.round(Math.sin(currentRot));
        currentX += (forwardX !== 0 ? forwardX : 1);
        setRobotPos([currentX, currentZ]);
      } else if (cmd.type === 'TURN_LEFT') {
        soundService.playPop();
        currentRot += Math.PI / 2;
        setRobotAngle(currentRot);
      } else if (cmd.type === 'TURN_RIGHT') {
        soundService.playPop();
        currentRot -= Math.PI / 2;
        setRobotAngle(currentRot);
      } else if (cmd.type === 'JUMP') {
        soundService.playPop();
        currentX += 2;
        setRobotPos([currentX, currentZ]);
      }
    }

    await new Promise((res) => setTimeout(res, 500));

    // Check if robot reached star target (x >= 2)
    if (currentX >= starTarget[0]) {
      soundService.playCorrect();
      setFeedback('🎉 Awesome Code! Robo-Buddy reached the Star! ⭐');

      setTimeout(async () => {
        try {
          const result = await gameService.submitAttempt(3, { 1: 'MOVE_RIGHT, MOVE_RIGHT' }, 30);
          showCelebration({
            title: '💻 Junior Programmer Master!',
            message: 'You programmed Robo-Buddy with a perfect algorithm sequence!',
            coinsEarned: result.coinsEarned || 30,
            starsEarned: result.starsEarned || 2,
            leveledUp: result.leveledUp,
          });
        } catch (e) {
          showCelebration({
            title: '💻 Junior Programmer Master!',
            message: 'You programmed Robo-Buddy with a perfect algorithm sequence!',
            coinsEarned: 30,
            starsEarned: 2,
          });
        }
        navigate('/');
      }, 1400);
    } else {
      soundService.playTryAgain();
      setFeedback('😊 Robo is still a little short of the star! Add more Move blocks!');
      setIsRunning(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '85vh', padding: '20px 24px 60px' }}>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto' }}>
        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={() => {
              soundService.playPop();
              navigate('/');
            }}
            className="btn-fun btn-fun-sky"
            style={{ padding: '10px 18px', fontSize: '1rem' }}
          >
            <ArrowLeft size={20} />
            <span>Island Map</span>
          </button>

          <div className="glass-panel" style={{
            padding: '8px 20px',
            background: 'white',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#0891b2',
            border: '2px solid #67e8f9'
          }}>
            Challenge: Walk 2 Steps to the Star ⭐
          </div>
        </div>

        {/* 3D Simulation Canvas Card */}
        <div className="glass-panel" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '32px',
          padding: '24px',
          border: '4px solid #26c6da',
          boxShadow: '0 20px 50px rgba(0, 188, 212, 0.25)',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '14px' }}>
            🤖 Robo-Buddy 3D Grid Simulator
          </h2>

          <Robot3DCanvas robotPos={robotPos} robotAngle={robotAngle} starPos={[2.4, 0.6, 0]} />

          {feedback && (
            <div style={{
              textAlign: 'center',
              marginTop: '16px',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: feedback.includes('Awesome') ? '#15803d' : '#0284c7'
            }} className="anim-pulse">
              {feedback}
            </div>
          )}
        </div>

        {/* Visual Programming Block Workspace */}
        <div className="glass-panel" style={{
          background: 'white',
          borderRadius: '32px',
          padding: '28px',
          border: '3px solid #e2e8f0',
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>
            🧩 Click Blocks to Build Your Robot Code:
          </h3>

          {/* Block Palette */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {commandPalette.map((cmd) => (
              <button
                key={cmd.type}
                onClick={() => handleAddCommand(cmd)}
                disabled={isRunning}
                className="btn-fun btn-fun-sky anim-wiggle"
                style={{ padding: '12px 20px', fontSize: '1.05rem', borderRadius: '18px' }}
              >
                <Plus size={18} />
                <span>{cmd.label}</span>
              </button>
            ))}
          </div>

          {/* Code Sequence Queue */}
          <div style={{
            background: '#f8fafc',
            border: '2px dashed #cbd5e1',
            borderRadius: '20px',
            padding: '20px',
            minHeight: '90px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '24px'
          }}>
            {program.length === 0 ? (
              <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '1.1rem' }}>
                👉 Tap blocks above to queue robot instructions! (e.g. Move Forward + Move Forward)
              </span>
            ) : (
              program.map((cmd, idx) => (
                <div
                  key={idx}
                  className="anim-float"
                  style={{
                    background: '#e0f2fe',
                    color: '#0369a1',
                    padding: '10px 18px',
                    borderRadius: '16px',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    border: '2px solid #7dd3fc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>#{idx + 1}</span>
                  <span>{cmd.label}</span>
                </div>
              ))
            )}
          </div>

          {/* Controls: Run & Reset */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleRunProgram}
              disabled={program.length === 0 || isRunning}
              className={`btn-fun ${program.length > 0 && !isRunning ? 'btn-fun-mint anim-pulse' : 'btn-fun-coral'}`}
              style={{
                flex: 2,
                padding: '16px',
                fontSize: '1.3rem',
                borderRadius: '9999px',
                opacity: program.length === 0 || isRunning ? 0.6 : 1,
                cursor: program.length === 0 || isRunning ? 'not-allowed' : 'pointer'
              }}
            >
              <Play size={24} />
              <span>{isRunning ? 'Robot Running...' : 'Run Program! 🚀'}</span>
            </button>

            <button
              onClick={handleClear}
              disabled={isRunning}
              className="btn-fun"
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '1.1rem',
                borderRadius: '9999px',
                background: '#fee2e2',
                color: '#dc2626',
                border: '2px solid #fecaca'
              }}
            >
              <Trash2 size={20} />
              <span>Clear Code</span>
            </button>
          </div>
        </div>
      </div>

      <MascotGuide
        name="Robo-Instructor 🤖"
        emoji="🤖"
        message="Robo is 2 steps away from the star! Add two 'Move Forward' blocks and click Run Program!"
      />
    </div>
  );
};

export default CodingLab;
