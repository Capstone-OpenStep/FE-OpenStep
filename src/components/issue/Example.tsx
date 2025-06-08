import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export interface ImageInfo {
  src: string;
  alt?: string;
  title?: string;
}

interface ExampleProps {
  images: ImageInfo[];
}

const Example: React.FC<ExampleProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openModal = (image: ImageInfo) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div style={{ width: 'auto', height: 181, position: 'relative', display: 'flex', justifyContent: 'center', marginTop: 13 }}>
        <div style={{ height: 181, borderRadius: 15, background: '#F2F2F2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ marginLeft: 36, marginRight: 36, justifyContent: 'flex-start', alignItems: 'center', gap: 42, display: 'inline-flex' }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  width: index === 0 ? 149 : 142,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: index === 0 ? 'flex-start' : 'flex-end',
                  gap: 7,
                  display: 'inline-flex'
                }}
              >
                <div style={{
                  alignSelf: 'stretch',
                  height: 21,
                  textAlign: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'Noto Sans KR',
                  fontWeight: '500',
                  wordWrap: 'break-word'
                }}>
                  {image.title || `예시 ${index + 1}`}
                </div>
                <div
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    alignSelf: 'stretch',
                    height: 130
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => openModal(image)}
                >
                  <img
                    style={{
                      alignSelf: 'stretch',
                      height: 130,
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                      transition: 'all 0.3s ease',
                      display: 'block'
                    }}
                    src={image.src}
                    alt={image.alt || `예시 ${index + 1}`}
                  />
                  {/* 호버 오버레이 */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: 8,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: hoveredIndex === index ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: hoveredIndex === index ? 'auto' : 'none'
                    }}
                  >
                    <Search
                      size={32}
                      color="white"
                      style={{
                        transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.8)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '50%',
              maxHeight: '80%',
              animation: 'zoomIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <X size={20} color="#333" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
      `}</style>
    </>
  );
}

export default Example;