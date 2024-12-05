import { registerBlockType } from '@wordpress/blocks';
import { 
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck 
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    ToggleControl,
    TextControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';

registerBlockType('pixam/audio-player', {
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();
        const { 
            audioUrl, 
            autoplay, 
            loop, 
            title, 
            artist, 
            thumbnailUrl, 
            thumbnailId,
            thumbnailAlt 
        } = attributes;

        const onSelectImage = (media) => {
            if (!media || !media.url) {
                setAttributes({ thumbnailUrl: undefined, thumbnailId: undefined, thumbnailAlt: '' });
                return;
            }

            setAttributes({
                thumbnailUrl: media.sizes?.thumbnail?.url || media.url,
                thumbnailId: media.id,
                thumbnailAlt: media.alt || ''
            });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Audio Settings', 'pixam-audio-player')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ audioUrl: media.url })}
                                allowedTypes={['audio']}
                                value={audioUrl}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        variant="primary"
                                        className="editor-post-featured-image__toggle"
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        {!audioUrl ? __('Upload Audio', 'pixam-audio-player') : __('Replace Audio', 'pixam-audio-player')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>

                        <TextControl
                            label={__('Title', 'pixam-audio-player')}
                            value={title || ''}
                            onChange={(value) => setAttributes({ title: value })}
                            style={{ marginBottom: '1rem' }}
                        />

                        <TextControl
                            label={__('Artist', 'pixam-audio-player')}
                            value={artist || ''}
                            onChange={(value) => setAttributes({ artist: value })}
                            style={{ marginBottom: '1rem' }}
                        />

                        <div style={{ marginBottom: '1rem' }}>
                            <p>{__('Thumbnail Image', 'pixam-audio-player')}</p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={thumbnailId}
                                    render={({ open }) => (
                                        <div>
                                            {thumbnailUrl ? (
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <img 
                                                        src={thumbnailUrl} 
                                                        alt={thumbnailAlt}
                                                        style={{ 
                                                            width: '100%', 
                                                            height: 'auto',
                                                            display: 'block',
                                                            marginBottom: '0.5rem'
                                                        }}
                                                    />
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        isSmall
                                                        style={{ marginRight: '0.5rem' }}
                                                    >
                                                        {__('Replace Image', 'pixam-audio-player')}
                                                    </Button>
                                                    <Button
                                                        onClick={() => setAttributes({ 
                                                            thumbnailUrl: undefined, 
                                                            thumbnailId: undefined,
                                                            thumbnailAlt: ''
                                                        })}
                                                        variant="link"
                                                        isDestructive
                                                        isSmall
                                                    >
                                                        {__('Remove Image', 'pixam-audio-player')}
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={open}
                                                    variant="secondary"
                                                >
                                                    {__('Upload Image', 'pixam-audio-player')}
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>

                        <ToggleControl
                            label={__('Autoplay', 'pixam-audio-player')}
                            checked={autoplay}
                            onChange={(value) => setAttributes({ autoplay: value })}
                        />
                        <ToggleControl
                            label={__('Loop', 'pixam-audio-player')}
                            checked={loop}
                            onChange={(value) => setAttributes({ loop: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    {audioUrl ? (
                        <div className="pixam-audio-player">
                            {thumbnailUrl && (
                                <div className="pixam-audio-thumbnail">
                                    <img src={thumbnailUrl} alt={thumbnailAlt} />
                                </div>
                            )}
                            <div className="pixam-audio-content">
                                <div className="pixam-audio-info">
                                    {title && <h3 className="pixam-audio-title">{title}</h3>}
                                    {artist && <p className="pixam-audio-artist">{artist}</p>}
                                </div>
                                <audio
                                    controls
                                    src={audioUrl}
                                    autoPlay={autoplay}
                                    loop={loop}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="pixam-audio-player-placeholder">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ audioUrl: media.url })}
                                    allowedTypes={['audio']}
                                    value={audioUrl}
                                    render={({ open }) => (
                                        <Button
                                            onClick={open}
                                            variant="primary"
                                            className="upload-button"
                                        >
                                            {__('Upload Audio', 'pixam-audio-player')}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    )}
                </div>
            </>
        );
    },
    save: function Save({ attributes }) {
        const blockProps = useBlockProps.save();
        const { 
            audioUrl, 
            autoplay, 
            loop, 
            title, 
            artist, 
            thumbnailUrl,
            thumbnailAlt 
        } = attributes;

        return (
            <div {...blockProps}>
                <div className="pixam-audio-player">
                    {thumbnailUrl && (
                        <div className="pixam-audio-thumbnail">
                            <img src={thumbnailUrl} alt={thumbnailAlt} />
                        </div>
                    )}
                    <div className="pixam-audio-content">
                        <div className="pixam-audio-info">
                            {title && <h3 className="pixam-audio-title">{title}</h3>}
                            {artist && <p className="pixam-audio-artist">{artist}</p>}
                        </div>
                        {audioUrl && (
                            <audio
                                controls
                                src={audioUrl}
                                autoPlay={autoplay}
                                loop={loop}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}); 