import React, { useState, useEffect } from 'react';
import './NewsEditor.css';

const NewsEditor = ({ newsApiUrl }) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'お知らせ',
    description: '',
    content: '',
    link: '',
    imageUrl: '',
    tags: '',
    status: 'draft',
    isNew: false,
    publishDate: new Date().toISOString().split('T')[0],
    postToX: false
  });


  // NEWS一覧取得
  useEffect(() => {
    fetchNewsList();
  }, []);

  const fetchNewsList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${newsApiUrl}?action=getAllNews`);
      const result = await response.json();

      if (result.success) {
        setNewsList(result.data || []);
      } else {
        alert('データ取得エラー: ' + result.message);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      alert('通信エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  // フォーム入力処理
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  // 新規作成開始
  const handleCreateNew = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      category: 'お知らせ',
      description: '',
      content: '',
      link: '',
      imageUrl: '',
      tags: '',
      status: 'draft',
      isNew: false,
      publishDate: new Date().toISOString().split('T')[0],
      postToX: false
    });
    setIsEditing(true);
  };

  // 編集開始
  const handleEdit = (news) => {
    setEditingNews(news);
    setFormData({
      id: news.id,
      title: news.title,
      category: news.category,
      description: news.description,
      content: news.content,
      link: news.link || '',
      imageUrl: news.imageUrl || '',
      tags: news.tags || '',
      status: news.status,
      isNew: news.isNew === 'TRUE' || news.isNew === true,
      publishDate: news.publishDate ? news.publishDate.replace(/\./g, '-') : new Date().toISOString().split('T')[0],
      postToX: false
    });
    setIsEditing(true);
  };

  // 保存処理
  const handleSave = async () => {
    // バリデーション
    if (!formData.title || !formData.description || !formData.content) {
      alert('タイトル、説明、本文は必須です');
      return;
    }

    const action = editingNews ? 'updateNews' : 'createNews';
    const payload = { ...formData };

    try {
      // GAS向けにURLパラメータ形式で送信（プリフライト回避）
      const params = new URLSearchParams();
      Object.keys(payload).forEach(key => {
        params.append(key, payload[key]);
      });
      
      const response = await fetch(`${newsApiUrl}?action=${action}`, {
        method: 'POST',
        body: params
      });

      const result = await response.json();

      if (result.success) {
        alert(editingNews ? '更新しました' : '作成しました');
        
        // X投稿結果の表示
        if (result.data && result.data.twitterPost) {
          if (result.data.twitterPost.success) {
            alert('Xへの投稿も成功しました！\nURL: ' + result.data.twitterPost.tweetUrl);
          } else {
            alert('Xへの投稿に失敗しました: ' + result.data.twitterPost.error);
          }
        }

        setIsEditing(false);
        fetchNewsList();
      } else {
        alert('エラー: ' + result.message);
      }
    } catch (error) {
      console.error('Failed to save news:', error);
      alert('保存に失敗しました');
    }
  };

  // 削除処理
  const handleDelete = async (id) => {
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }

    try {
      // GAS向けにURLパラメータ形式で送信（プリフライト回避）
      const params = new URLSearchParams();
      params.append('id', id);
      
      const response = await fetch(`${newsApiUrl}?action=deleteNews`, {
        method: 'POST',
        body: params
      });

      const result = await response.json();

      if (result.success) {
        alert('削除しました');
        fetchNewsList();
      } else {
        alert('エラー: ' + result.message);
      }
    } catch (error) {
      console.error('Failed to delete news:', error);
      alert('削除に失敗しました');
    }
  };

  // キャンセル
  const handleCancel = () => {
    setIsEditing(false);
    setEditingNews(null);
  };

  // ステータスバッジ
  const getStatusBadge = (status) => {
    const badges = {
      published: { text: '公開中', color: '#4CAF50' },
      draft: { text: '下書き', color: '#9E9E9E' },
      scheduled: { text: '予約投稿', color: '#2196F3' }
    };
    const badge = badges[status] || badges.draft;
    return (
      <span className="status-badge" style={{ backgroundColor: badge.color }}>
        {badge.text}
      </span>
    );
  };

  return (
    <div className="news-editor">
      {!isEditing ? (
        <>
          {/* NEWS一覧表示 */}
          <div className="news-header">
            <button className="btn-create" onClick={handleCreateNew}>
              ➕ 新規作成
            </button>
            <button className="btn-refresh" onClick={fetchNewsList} disabled={isLoading}>
              🔄 更新
            </button>
          </div>

          {isLoading ? (
            <div className="loading">読み込み中...</div>
          ) : (
            <div className="news-list">
              {newsList.length === 0 ? (
                <p className="no-data">お知らせがありません</p>
              ) : (
                <table className="news-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>タイトル</th>
                      <th>カテゴリ</th>
                      <th>公開日</th>
                      <th>ステータス</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsList.map(news => (
                      <tr key={news.id}>
                        <td>{news.id}</td>
                        <td>{news.title}</td>
                        <td>{news.category}</td>
                        <td>{news.publishDate}</td>
                        <td>{getStatusBadge(news.status)}</td>
                        <td>
                          <button className="btn-edit" onClick={() => handleEdit(news)}>
                            ✏️ 編集
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(news.id)}>
                            🗑️ 削除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {/* 編集フォーム */}
          <div className="news-form-header">
            <h3>{editingNews ? 'お知らせ編集' : 'お知らせ新規作成'}</h3>
          </div>

          <div className="news-form">
            <div className="form-group">
              <label>タイトル *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="お知らせのタイトル"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>カテゴリ *</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="お知らせ">お知らせ</option>
                  <option value="イベント">イベント</option>
                  <option value="メディア掲載">メディア掲載</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div className="form-group">
                <label>公開日 *</label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>ステータス *</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="draft">下書き</option>
                  <option value="published">公開</option>
                  <option value="scheduled">予約投稿</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>説明文 *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="お知らせの概要（一覧表示用）"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>本文 *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="お知らせの詳細内容"
                rows="10"
                required
              />
            </div>

            <div className="form-group">
              <label>リンクURL</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="form-group">
              <label>画像URL（カンマ区切りで複数可）</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', lineHeight: '1.6' }}>
                💡 <strong>ヒント:</strong> <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#8BC780', textDecoration: 'underline' }}>ImgBB</a> や <a href="https://imgur.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#8BC780', textDecoration: 'underline' }}>Imgur</a> などの無料画像ホスティングサービスで画像をアップロードし、URLを取得してください。<br/>
                複数画像を表示したい場合はカンマで区切って入力してください（例: URL1, URL2, URL3）
              </p>
            </div>

            <div className="form-group">
              <label>タグ（カンマ区切り）</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="例: イベント, ボードゲーム, 秋田"
              />
            </div>

            <div className="form-checkboxes">
              <label>
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                />
                NEWバッジを表示
              </label>

              <label>
                <input
                  type="checkbox"
                  name="postToX"
                  checked={formData.postToX}
                  onChange={handleInputChange}
                />
                X (Twitter) に投稿する
              </label>
            </div>

            <div className="form-actions">
              <button className="btn-save" onClick={handleSave}>
                💾 保存
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                ❌ キャンセル
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsEditor;
