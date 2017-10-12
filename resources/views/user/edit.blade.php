@extends('layouts.app')

@section('top')
    <a href="{{ route('post.index') }}" class="btn btn-danger">Cancel</a>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body pb0">
                    {!! Form::open(['id' => 'post-update-form']) !!}
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Cite:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::select('cite', $cite, $post->cite, ['class' => 'form-control']) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Content:</label>
                            <div class="col-md-11 col-sm-10">
                                {{ Form::textarea('content['.$default_language_id.']', $post->content, ['class' => 'form-control', 'rows' => 3]) }}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Translations</legend>
                        @if(count($languages) == 0)
                            <h4>No other language found</h4>
                        @endif
                        @foreach($languages as $language)
                            <fieldset>
                                <div class="form-group">
                                    <label class="col-md-1 col-sm-2 control-label">{{ $language->name }}:</label>
                                    <div class="col-md-11 col-sm-10">
                                        {{ Form::textarea('content['.$language->id.']', $localizations[$language->id], ['class' => 'form-control', 'rows' => 3]) }}
                                    </div>
                                </div>
                            </fieldset>
                        @endforeach
                    </fieldset>
                    <div class="form-group text-right">
                        <div class="col-md-12">
                            <input type="submit" class="btn btn-success"/>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    {!! Form::close() !!}
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    jQuery(function ($) {
        $main_form = $('#post-update-form');
        $main_form.submit(function () {

            $.notify(window.custom.messages.processing);

            $.ajax({
                url: '{{ route('post.update', $post->id) }}',
                type: 'PUT',
                dataType: 'JSON',
                data: $main_form.serializeArray(),
                success: function (data) {
                    $.notify.closeAll();
                    $.notify(data);
                },
                error: function (e) {
                    $.notify.closeAll();
                    $.notify(window.custom.messages.internal_error);
                }
            });

            return false;
        });
    });
</script>
@endpush