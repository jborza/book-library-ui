import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';

interface DirectoryResponse {
  current_path: string;
  parent_path: string | null;
  directories: string[];
}

@Component({
  selector: 'app-directory-browser',
  imports: [CommonModule],
  templateUrl: './directory-browser.component.html',
  styleUrl: './directory-browser.component.less',
})
export class DirectoryBrowserComponent implements OnInit {
  directories: string[] = [];
  currentPath = '';
  parentPath: string | null = null;
  loading = false;
  error = '';
  selectedDirectory: string | null = null;
  @Output() directoryPicked = new EventEmitter<string>();

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.browse('');
  }

  browse(path: string) {
    this.loading = true;
    this.error = '';
    const url = this.apiService.getDirectoryBrowseUrl();
    this.http.get<DirectoryResponse>(url, { params: { path } }).subscribe({
      next: (res) => {
        this.directories = res.directories;
        this.currentPath = res.current_path;
        this.parentPath = res.parent_path;
        this.loading = false;
        this.selectedDirectory = this.currentPath; // Select current directory by default
      },
      error: (err) => {
        this.error = 'Failed to load directories';
        this.loading = false;
      },
    });
  }

  onDirectoryClick(dir: string) {
    if (dir === '..' && this.parentPath !== null) {
      this.browse(this.parentPath);
    } else if (dir !== '..') {
      const newPath = this.currentPath ? `${this.currentPath}/${dir}` : dir;
      this.browse(newPath);
    }
  }

  onOkClick() {
    if (this.selectedDirectory !== null) {
      this.directoryPicked.emit(this.selectedDirectory);
    }
  }
}
