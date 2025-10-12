import React, { useState, useEffect } from 'react';
import './NewsEditor.css';

const NewsEditor = ({ newsItem, onSave, onCancel }) => {
  const isEditMode = !!newsItem;

  // フォーム状態
  const [formData, setFormData] = useState({
    title: '',
    category: 'イベント',
    publishDate: new Date().toISOString().split('T')[0],
    description: '',
    content: '',
    link: '',
    imageUrl: '',
    tags: '',
    status: 'draft',
    isNew: false,
    displayOrder: 0
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // 編集モード時にデータをロード
  useEffect(() => {
    if (newsItem) {
      setFormData({
        title: newsItem.title || '',
        category: newsItem.category || 'イベント',
        publishDate: newsItem.publishDate ? newsItem.publishDate.replace(/\./g, '-') : new Date().toISOString().split('T')[0],
        description: newsItem.description || '',
        content: newsItem.content || '',
        link: newsItem.link || '',
        imageUrl: newsItem.imageUrl || '',
        tags: newsItem.tags || '',
        status: newsItem.status || 'draft',
        isNew: newsItem.isNew === 'TRUE' || newsItem.isNew === true || false,
        displayOrder: newsItem.displayOrder || 0
      });
    }
  }, [newsItem]);

  // 入力変更ハンドラ
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // バリデーション
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    }

    if (!formData.category) {
      newErrors.category = 'カテゴリは必須です';
    }

    if (!formData.publishDate) {
      newErrors.publishDate = '公開日は必須です';
    }

    if (!formData.description.trim()) {
      newErrors.description = '概要は必須です';
    } else if (formData.description.length > 200) {
      newErrors.description = '概要は200文字以内で入力してください';
    }

    if (!formData.content.trim()) {
      newErrors.content = '本文は必須です';
    }

    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = '有効なURLを入力してください（例: /ke または https://example.com）';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = '有効なURLを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL検証
  const isValidUrl = (string) => {
    if (string.startsWith('/')) return true; // 相対パス
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // 保存処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSaving(true);

    try {
      // 公開日を YYYY-MM-DD 形式に変換
      const saveData = {
        ...formData,
        publishDate: formData.publishDate,
        isNew: formData.isNew,
        displayOrder: parseInt(formData.displayOrder) || 0
      };

      if (isEditMode) {
        saveData.id = newsItem.id;
      }

      await onSave(saveData);
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました。もう一度お試しください。');
    } finally {
      setIsSaving(false);
    }
  };

  // プレビュー表示
  const renderPreview = () => {
    const formattedDate = formData.publishDate ?
      formData.publishDate.split('-').join('.') :
      new Date().toISOString().split('T')[0].split('-').join('.');

    return (
      <div className="news-preview-card">
        <div className="news-preview-header">
          <time className="news-preview-date">{formattedDate}</time>
          <div className="news-preview-labels">
            <span className={`news-preview-category category-${formData.category}`}>
              {formData.category}
            </span>
            {formData.isNew && <span className="news-preview-badge">NEW</span>}
          </div>
        </div>
        <h2 className="news-preview-title">{formData.title || 'タイトルを入力してください'}</h2>
        <p className="news-preview-description">{formData.description || '概要を入力してください'}</p>
        <p className="news-preview-content">{formData.content || '本文を入力してください'}</p>
        {formData.link && (
          <a href={formData.link} className="news-preview-link">
            詳しく見る
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="news-editor">
      <div className="news-editor-header">
        <h2 className="news-editor-title">
          {isEditMode ? 'NEWS記事を編集' : 'NEWS記事を作成'}
        </h2>
        <button className="news-editor-close" onClick={onCancel}>
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="news-editor-form">
        <div className="news-editor-layout">
          {/* 左カラム: 入力フォーム */}
          <div className="news-editor-left">
            {/* タイトル */}
            <div className="news-form-group">
              <label className="news-form-label">
                タイトル <span className="news-required">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`news-form-input ${errors.title ? 'error' : ''}`}
                placeholder="記事のタイトルを入力"
              />
              {errors.title && <span className="news-form-error">{errors.title}</span>}
            </div>

            {/* カテゴリと公開日 */}
            <div className="news-form-row">
              <div className="news-form-group">
                <label className="news-form-label">
                  カテゴリ <span className="news-required">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`news-form-select ${errors.category ? 'error' : ''}`}
                >
                  <option value="イベント">イベント</option>
                  <option value="お知らせ">お知らせ</option>
                  <option value="メディア">メディア</option>
                </select>
                {errors.category && <span className="news-form-error">{errors.category}</span>}
              </div>

              <div className="news-form-group">
                <label className="news-form-label">
                  公開日 <span className="news-required">*</span>
                </label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  className={`news-form-input ${errors.publishDate ? 'error' : ''}`}
                />
                {errors.publishDate && <span className="news-form-error">{errors.publishDate}</span>}
              </div>
            </div>

            {/* 概要 */}
            <div className="news-form-group">
              <label className="news-form-label">
                概要 <span className="news-required">*</span>
                <span className="news-char-count">
                  {formData.description.length} / 200
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`news-form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="記事の概要を入力（200文字以内）"
                rows="3"
                maxLength="200"
              />
              {errors.description && <span className="news-form-error">{errors.description}</span>}
            </div>

            {/* 本文 */}
            <div className="news-form-group">
              <label className="news-form-label">
                本文 <span className="news-required">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className={`news-form-textarea ${errors.content ? 'error' : ''}`}
                placeholder="記事の本文を入力"
                rows="8"
              />
              {errors.content && <span className="news-form-error">{errors.content}</span>}
            </div>

            {/* 関連リンク */}
            <div className="news-form-group">
              <label className="news-form-label">関連リンク</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={`news-form-input ${errors.link ? 'error' : ''}`}
                placeholder="/ke または https://example.com"
              />
              {errors.link && <span className="news-form-error">{errors.link}</span>}
            </div>

            {/* 画像URL */}
            <div className="news-form-group">
              <label className="news-form-label">画像URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`news-form-input ${errors.imageUrl ? 'error' : ''}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && <span className="news-form-error">{errors.imageUrl}</span>}
            </div>

            {/* タグ */}
            <div className="news-form-group">
              <label className="news-form-label">タグ</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="news-form-input"
                placeholder="カンマ区切りで入力（例: イベント,秋田,Ke.）"
              />
            </div>

            {/* ステータスと表示順序 */}
            <div className="news-form-row">
              <div className="news-form-group">
                <label className="news-form-label">
                  ステータス <span className="news-required">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="news-form-select"
                >
                  <option value="draft">下書き</option>
                  <option value="published">公開</option>
                  <option value="scheduled">予約公開</option>
                </select>
              </div>

              <div className="news-form-group">
                <label className="news-form-label">表示順序</label>
                <input
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleChange}
                  className="news-form-input"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* NEWバッジ */}
            <div className="news-form-group">
              <label className="news-form-checkbox">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                />
                <span>NEWバッジを表示する</span>
              </label>
            </div>
          </div>

          {/* 右カラム: プレビュー */}
          <div className="news-editor-right">
            <div className="news-preview-header-section">
              <h3 className="news-preview-title-section">プレビュー</h3>
              <button
                type="button"
                className="news-preview-fullscreen-btn"
                onClick={() => setShowPreview(true)}
              >
                🔍 拡大表示
              </button>
            </div>
            {renderPreview()}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="news-editor-actions">
          <button
            type="button"
            className="news-editor-cancel-btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="news-editor-save-btn"
            disabled={isSaving}
          >
            {isSaving ? '保存中...' : isEditMode ? '更新する' : '作成する'}
          </button>
        </div>
      </form>

      {/* フルスクリーンプレビューモーダル */}
      {showPreview && (
        <div className="news-preview-modal" onClick={() => setShowPreview(false)}>
          <div className="news-preview-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="news-preview-modal-close"
              onClick={() => setShowPreview(false)}
            >
              ✕
            </button>
            {renderPreview()}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsEditor;
